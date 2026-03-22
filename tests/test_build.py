"""Tests for build integrity and file structure."""

import os
import subprocess

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class TestBuildIntegrity:
    """Test that the project builds without errors."""

    def test_npm_build_succeeds(self):
        result = subprocess.run(
            ["npm", "run", "build"],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True,
            timeout=120,
        )
        assert result.returncode == 0, f"Build failed:\n{result.stderr}"

    def test_dist_directory_created(self):
        subprocess.run(
            ["npm", "run", "build"],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True,
            timeout=120,
        )
        dist_path = os.path.join(PROJECT_ROOT, "dist")
        assert os.path.isdir(dist_path), "dist/ directory should exist after build"

    def test_index_html_in_dist(self):
        html_path = os.path.join(PROJECT_ROOT, "dist", "index.html")
        assert os.path.isfile(html_path), "dist/index.html should exist"


class TestFileStructure:
    """Test that all required files exist."""

    REQUIRED_FILES = [
        # Character themes
        "src/data/characterThemes.js",
        "src/components/CharacterThemePicker.jsx",
        # Geometric wallpaper
        "src/components/GeometricWallpaper.jsx",
        # Clippy chatbot
        "api/chat.js",
        "src/context/ClippyContext.jsx",
        "src/components/ClippyBubble.jsx",
        "src/components/ClippyCharacter.jsx",
        "src/components/apps/ClippyApp.jsx",
        # Core files (should still exist)
        "src/App.jsx",
        "src/main.jsx",
        "src/index.css",
        "src/context/ColorContext.jsx",
        "src/context/ThemeContext.jsx",
        "src/context/WindowContext.jsx",
        "src/components/Desktop.jsx",
        "src/components/Dock.jsx",
        "src/components/apps/SettingsApp.jsx",
    ]

    def test_all_required_files_exist(self):
        for rel_path in self.REQUIRED_FILES:
            full_path = os.path.join(PROJECT_ROOT, rel_path)
            assert os.path.isfile(full_path), f"Required file missing: {rel_path}"

    def test_no_typescript_files_accidentally_created(self):
        for root, dirs, files in os.walk(os.path.join(PROJECT_ROOT, "src")):
            for f in files:
                assert not f.endswith(".ts") and not f.endswith(".tsx"), (
                    f"TypeScript file found in JSX project: {os.path.join(root, f)}"
                )


class TestCSSAnimations:
    """Test that all required CSS animations are defined."""

    REQUIRED_KEYFRAMES = [
        "pulse",
        "driftA",
        "driftB",
        "shapeSpin",
        "clippyBounce",
        "clippySpeechIn",
        "typingDots",
    ]

    def test_all_keyframes_defined(self):
        css_path = os.path.join(PROJECT_ROOT, "src", "index.css")
        with open(css_path) as f:
            css = f.read()
        for name in self.REQUIRED_KEYFRAMES:
            assert f"@keyframes {name}" in css, (
                f"Missing @keyframes {name} in index.css"
            )
