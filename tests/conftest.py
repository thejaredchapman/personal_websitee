"""Shared fixtures for all test modules."""

import json
import os
import re
import subprocess
import time

import pytest
import requests


API_BASE = "http://localhost:3000"
SITE_BASE = "http://localhost:3000"
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


@pytest.fixture(scope="session")
def vercel_server():
    """Start vercel dev server for the test session."""
    # Check if server is already running
    try:
        r = requests.get(f"{SITE_BASE}/", timeout=2)
        if r.status_code == 200:
            yield SITE_BASE
            return
    except requests.ConnectionError:
        pass

    proc = subprocess.Popen(
        ["npx", "vercel", "dev", "--listen", "3000", "--yes"],
        cwd=PROJECT_ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )

    # Wait for server to be ready (max 30s)
    for _ in range(60):
        try:
            r = requests.get(f"{SITE_BASE}/", timeout=1)
            if r.status_code == 200:
                break
        except requests.ConnectionError:
            time.sleep(0.5)
    else:
        proc.terminate()
        pytest.fail("Vercel dev server failed to start within 30s")

    yield SITE_BASE

    proc.terminate()
    proc.wait(timeout=5)


@pytest.fixture
def api_url(vercel_server):
    """Base URL for API requests."""
    return f"{vercel_server}/api"


# --- Static file fixtures (no server needed) ---


@pytest.fixture(scope="session")
def character_themes_source():
    """Read the character themes JS source file."""
    path = os.path.join(PROJECT_ROOT, "src", "data", "characterThemes.js")
    with open(path) as f:
        return f.read()


@pytest.fixture(scope="session")
def api_chat_source():
    """Read the API chat.js source file."""
    path = os.path.join(PROJECT_ROOT, "api", "chat.js")
    with open(path) as f:
        return f.read()


@pytest.fixture(scope="session")
def geometric_wallpaper_source():
    """Read the GeometricWallpaper component source."""
    path = os.path.join(PROJECT_ROOT, "src", "components", "GeometricWallpaper.jsx")
    with open(path) as f:
        return f.read()


@pytest.fixture(scope="session")
def index_css_source():
    """Read the index.css source."""
    path = os.path.join(PROJECT_ROOT, "src", "index.css")
    with open(path) as f:
        return f.read()


@pytest.fixture(scope="session")
def desktop_source():
    """Read the Desktop.jsx source."""
    path = os.path.join(PROJECT_ROOT, "src", "components", "Desktop.jsx")
    with open(path) as f:
        return f.read()


@pytest.fixture(scope="session")
def clippy_context_source():
    """Read the ClippyContext.jsx source."""
    path = os.path.join(PROJECT_ROOT, "src", "context", "ClippyContext.jsx")
    with open(path) as f:
        return f.read()


@pytest.fixture(scope="session")
def clippy_bubble_source():
    """Read the ClippyBubble.jsx source."""
    path = os.path.join(PROJECT_ROOT, "src", "components", "ClippyBubble.jsx")
    with open(path) as f:
        return f.read()


@pytest.fixture(scope="session")
def clippy_app_source():
    """Read the ClippyApp.jsx source."""
    path = os.path.join(PROJECT_ROOT, "src", "components", "apps", "ClippyApp.jsx")
    with open(path) as f:
        return f.read()


@pytest.fixture(scope="session")
def settings_app_source():
    """Read the SettingsApp.jsx source."""
    path = os.path.join(PROJECT_ROOT, "src", "components", "apps", "SettingsApp.jsx")
    with open(path) as f:
        return f.read()


@pytest.fixture(scope="session")
def dock_source():
    """Read the Dock.jsx source."""
    path = os.path.join(PROJECT_ROOT, "src", "components", "Dock.jsx")
    with open(path) as f:
        return f.read()


@pytest.fixture(scope="session")
def window_context_source():
    """Read the WindowContext.jsx source."""
    path = os.path.join(PROJECT_ROOT, "src", "context", "WindowContext.jsx")
    with open(path) as f:
        return f.read()


@pytest.fixture(scope="session")
def main_jsx_source():
    """Read the main.jsx source."""
    path = os.path.join(PROJECT_ROOT, "src", "main.jsx")
    with open(path) as f:
        return f.read()


@pytest.fixture(scope="session")
def app_jsx_source():
    """Read the App.jsx source."""
    path = os.path.join(PROJECT_ROOT, "src", "App.jsx")
    with open(path) as f:
        return f.read()
