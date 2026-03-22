"""Tests for character theme definitions and integration."""

import re


EXPECTED_CHARACTERS = [
    "goku",
    "spiderman",
    "macewindu",
    "staticshock",
    "hulk",
    "clippy",
    "blackpanther",
]

SHADE_KEYS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"]


class TestCharacterThemeDefinitions:
    """Test the character themes data file."""

    def test_all_characters_present(self, character_themes_source):
        for char_id in EXPECTED_CHARACTERS:
            assert f"'{char_id}'" in character_themes_source or f'"{char_id}"' in character_themes_source or f"{char_id}:" in character_themes_source, (
                f"Character '{char_id}' not found in characterThemes.js"
            )

    def test_each_character_has_id(self, character_themes_source):
        for char_id in EXPECTED_CHARACTERS:
            assert f"id: '{char_id}'" in character_themes_source, (
                f"Character '{char_id}' missing id field"
            )

    def test_each_character_has_name(self, character_themes_source):
        for char_id in EXPECTED_CHARACTERS:
            # Each character block should have a name field
            pattern = rf"{char_id}:.*?name:\s*'"
            assert re.search(pattern, character_themes_source, re.DOTALL), (
                f"Character '{char_id}' missing name field"
            )

    def test_each_character_has_icon(self, character_themes_source):
        for char_id in EXPECTED_CHARACTERS:
            pattern = rf"{char_id}:.*?icon:\s*'"
            assert re.search(pattern, character_themes_source, re.DOTALL), (
                f"Character '{char_id}' missing icon field"
            )

    def test_each_character_has_palette_with_all_shades(self, character_themes_source):
        for shade in SHADE_KEYS:
            # Each shade should appear multiple times (once per character)
            count = len(re.findall(rf"\b{shade}:\s*'#[a-fA-F0-9]{{6}}'", character_themes_source))
            assert count >= len(EXPECTED_CHARACTERS), (
                f"Shade {shade} found {count} times, expected at least {len(EXPECTED_CHARACTERS)}"
            )

    def test_palette_hex_values_are_valid(self, character_themes_source):
        hex_values = re.findall(r"'(#[a-fA-F0-9]{6})'", character_themes_source)
        assert len(hex_values) > 0, "No hex color values found"
        for hex_val in hex_values:
            assert re.match(r"^#[0-9a-fA-F]{6}$", hex_val), (
                f"Invalid hex color: {hex_val}"
            )

    def test_each_character_has_wallpaper_config(self, character_themes_source):
        for char_id in EXPECTED_CHARACTERS:
            pattern = rf"{char_id}:.*?wallpaper:\s*\{{"
            assert re.search(pattern, character_themes_source, re.DOTALL), (
                f"Character '{char_id}' missing wallpaper config"
            )

    def test_each_wallpaper_has_background(self, character_themes_source):
        backgrounds = re.findall(r"background:\s*'(#[a-fA-F0-9]{6})'", character_themes_source)
        assert len(backgrounds) >= len(EXPECTED_CHARACTERS), (
            f"Found {len(backgrounds)} background colors, expected at least {len(EXPECTED_CHARACTERS)}"
        )

    def test_each_wallpaper_has_blobs_array(self, character_themes_source):
        blobs_count = len(re.findall(r"blobs:\s*\[", character_themes_source))
        assert blobs_count >= len(EXPECTED_CHARACTERS), (
            f"Found {blobs_count} blob arrays, expected at least {len(EXPECTED_CHARACTERS)}"
        )

    def test_blob_configs_have_required_fields(self, character_themes_source):
        required_blob_fields = ["color", "width", "height", "blur", "opacity"]
        for field in required_blob_fields:
            count = len(re.findall(rf"{field}:", character_themes_source))
            assert count >= len(EXPECTED_CHARACTERS), (
                f"Blob field '{field}' found {count} times, expected many more"
            )

    def test_no_duplicate_character_ids(self, character_themes_source):
        ids = re.findall(r"id:\s*'(\w+)'", character_themes_source)
        assert len(ids) == len(set(ids)), (
            f"Duplicate character IDs found: {[x for x in ids if ids.count(x) > 1]}"
        )


class TestCharacterThemeIntegration:
    """Test that character themes are properly wired into the app."""

    def test_color_context_imports_character_themes(self):
        path = "src/context/ColorContext.jsx"
        with open(path) as f:
            source = f.read()
        assert "characterThemes" in source, "ColorContext should import characterThemes"

    def test_color_context_has_active_character_state(self):
        path = "src/context/ColorContext.jsx"
        with open(path) as f:
            source = f.read()
        assert "activeCharacter" in source
        assert "activateCharacterTheme" in source
        assert "clearCharacterTheme" in source

    def test_color_context_persists_character_theme(self):
        path = "src/context/ColorContext.jsx"
        with open(path) as f:
            source = f.read()
        assert "character-theme-preference" in source, (
            "ColorContext should persist character theme to localStorage"
        )

    def test_desktop_uses_character_wallpaper(self, desktop_source):
        assert "wallpaperConfig" in desktop_source
        assert "characterThemes" in desktop_source

    def test_settings_has_character_theme_picker(self, settings_app_source):
        assert "CharacterThemePicker" in settings_app_source
