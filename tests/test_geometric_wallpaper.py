"""Tests for the geometric wallpaper component and CSS animations."""

import re


EXPECTED_SHAPE_TYPES = ["triangle", "hexagon", "circle", "square", "diamond", "cross"]

EXPECTED_ANIMATIONS = ["driftA", "driftB", "shapeSpin"]


class TestGeometricWallpaperComponent:
    """Test the GeometricWallpaper React component."""

    def test_component_exists(self, geometric_wallpaper_source):
        assert "function GeometricWallpaper" in geometric_wallpaper_source

    def test_component_is_exported(self, geometric_wallpaper_source):
        assert "export default GeometricWallpaper" in geometric_wallpaper_source

    def test_all_shape_types_defined(self, geometric_wallpaper_source):
        for shape in EXPECTED_SHAPE_TYPES:
            assert f"'{shape}'" in geometric_wallpaper_source, (
                f"Shape type '{shape}' not found in component"
            )

    def test_shape_svg_renders_all_types(self, geometric_wallpaper_source):
        assert "function ShapeSvg" in geometric_wallpaper_source
        for shape in EXPECTED_SHAPE_TYPES:
            assert f"case '{shape}'" in geometric_wallpaper_source, (
                f"ShapeSvg missing case for '{shape}'"
            )

    def test_shapes_use_accent_color_variables(self, geometric_wallpaper_source):
        assert "var(--accent-" in geometric_wallpaper_source, (
            "Shapes should use CSS accent color variables for theme reactivity"
        )

    def test_shapes_have_animation(self, geometric_wallpaper_source):
        assert "driftA" in geometric_wallpaper_source
        assert "driftB" in geometric_wallpaper_source

    def test_shapes_have_spin_animation(self, geometric_wallpaper_source):
        assert "shapeSpin" in geometric_wallpaper_source

    def test_background_glow_uses_accent_colors(self, geometric_wallpaper_source):
        assert "var(--accent-500)" in geometric_wallpaper_source
        assert "var(--accent-400)" in geometric_wallpaper_source

    def test_seeded_random_for_deterministic_layout(self, geometric_wallpaper_source):
        assert "seededRandom" in geometric_wallpaper_source, (
            "Should use seeded random to avoid layout shifts on re-render"
        )

    def test_uses_memo_for_shapes(self, geometric_wallpaper_source):
        assert "useMemo" in geometric_wallpaper_source, (
            "Shapes should be memoized to prevent regeneration on re-render"
        )

    def test_shape_count_defined(self, geometric_wallpaper_source):
        match = re.search(r"SHAPE_COUNT\s*=\s*(\d+)", geometric_wallpaper_source)
        assert match, "SHAPE_COUNT constant should be defined"
        count = int(match.group(1))
        assert count >= 10, f"Should have at least 10 shapes, got {count}"

    def test_shapes_have_varied_sizes(self, geometric_wallpaper_source):
        # Check that size calculation includes randomness range
        assert "size:" in geometric_wallpaper_source
        size_match = re.search(r"size:\s*(\d+)\s*\+", geometric_wallpaper_source)
        assert size_match, "Shape sizes should have a base + random range"

    def test_pointer_events_none(self, geometric_wallpaper_source):
        assert "pointer-events-none" in geometric_wallpaper_source, (
            "Wallpaper should not intercept mouse events"
        )

    def test_overflow_hidden(self, geometric_wallpaper_source):
        assert "overflow-hidden" in geometric_wallpaper_source, (
            "Wallpaper container should clip overflow"
        )


class TestGeometricWallpaperCSS:
    """Test that required CSS animations exist."""

    def test_drift_a_keyframes(self, index_css_source):
        assert "@keyframes driftA" in index_css_source

    def test_drift_b_keyframes(self, index_css_source):
        assert "@keyframes driftB" in index_css_source

    def test_shape_spin_keyframes(self, index_css_source):
        assert "@keyframes shapeSpin" in index_css_source

    def test_drift_has_multiple_waypoints(self, index_css_source):
        # Extract from @keyframes driftA to the next @keyframes or end
        drift_a = re.search(
            r"@keyframes driftA\s*\{(.*?)(?=@keyframes|\Z)", index_css_source, re.DOTALL
        )
        assert drift_a, "driftA keyframes not found"
        stops = re.findall(r"\d+%", drift_a.group(1))
        assert len(stops) >= 4, f"driftA should have at least 4 stops, got {len(stops)}"

    def test_pulse_animation_still_exists(self, index_css_source):
        assert "@keyframes pulse" in index_css_source, (
            "pulse animation should still exist for character theme blobs"
        )


class TestGeometricWallpaperIntegration:
    """Test wallpaper integration in Desktop component."""

    def test_desktop_imports_geometric_wallpaper(self, desktop_source):
        assert "GeometricWallpaper" in desktop_source

    def test_desktop_uses_geometric_as_default(self, desktop_source):
        assert "<GeometricWallpaper" in desktop_source

    def test_desktop_still_supports_character_blobs(self, desktop_source):
        assert "wallpaperConfig" in desktop_source
        assert "wallpaperConfig.blobs" in desktop_source

    def test_character_theme_overrides_geometric(self, desktop_source):
        # Character theme should be checked first, geometric is fallback
        assert "wallpaperConfig ?" in desktop_source or "wallpaperConfig?" in desktop_source
