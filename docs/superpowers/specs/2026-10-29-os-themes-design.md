# OS Themes + Commit-Aware Splash — Design

Date: 2026-10-29

## Goal
Replace character themes and accent colors with four OS themes (Windows XP, Windows 95, MySpace, Ubuntu), each with light and dark variants, and rework the boot splash to show the latest git commit in the active OS style.

## 1. Removals
- Delete `CharacterThemePicker.jsx`, `data/characterThemes.js`, `ColorPicker.jsx`.
- Strip accent-color and character logic from `ColorContext` (or remove it); update `SettingsApp`, `MenuBar`, `MobileShell`, and related tests.
- Keep the `--accent-50..900` variables; each OS theme sets them so existing components keep working.

## 2. OS themes
- `ThemeContext` gains `os` (`xp | win95 | myspace | ubuntu`) alongside `mode` (`light | dark`). `os` persists to `localStorage` key `os-theme`. `mode` keeps following the system until toggled (`theme-preference`).
- `<html>` carries `data-os` and `data-theme`.
- `src/themes/<os>.css` defines, per mode: existing semantic variables, plus title bar, window buttons, bar/dock, fonts, radius, wallpaper tokens. Win95 dark is a dark slate-gray variant.
- Looks: XP (Bliss hills, blue title bars, green start-style bar); Win95 (teal desktop, bevels, gray bar); MySpace (blue/orange, profile styling, pattern wallpaper); Ubuntu (aubergine/orange, left launcher, flat top bar).
- `Window`, `MenuBar`, `Dock` use the variables and `data-os` selectors. Layout/positions unchanged; mobile unchanged.
- Settings gets an Appearance section: OS cards with swatches + light/dark toggle. Menu bar keeps quick toggle.

## 3. Splash
- `vite.config.js` injects latest commit hash, subject, date at build time (`git log -1`).
- Boot screen shows "Latest commit: <hash> <subject>" replacing the hardcoded "Last updated" and stale `[ NEW ]` lines; a writing-article `[ NEW ]` line is derived from the commit.
- Boot screen is styled per OS (XP startup, Win95 text boot, MySpace loading page, Ubuntu purple splash). Uses saved OS; defaults to Ubuntu on first visit.

## 4. Verification
Update ThemeContext/ColorContext tests; run lint and build; check all 8 OS×mode combinations in the browser.
