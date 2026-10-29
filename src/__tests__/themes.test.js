import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { OS_THEMES } from '../themes/themes'

const TOKENS = ['--bg-primary', '--text-primary', '--accent-500', '--win-bg', '--os-wallpaper', '--os-bar-bg', '--os-dock-bg', '--os-title-bg', '--os-wb-bg', '--os-font']

describe('OS theme stylesheets', () => {
  it('registers the six themes', () => {
    expect(OS_THEMES.map((t) => t.id)).toEqual(['xp', 'win95', 'macos', 'myspace', 'ubuntu', 'tandy'])
  })

  for (const { id } of OS_THEMES) {
    it(`${id} defines light and dark token sets`, () => {
      const css = readFileSync(resolve(__dirname, `../themes/${id}.css`), 'utf8')
      expect(css).toContain(`html[data-os="${id}"] {`)
      expect(css).toContain(`html[data-os="${id}"][data-theme="dark"] {`)
      for (const token of TOKENS) expect(css).toContain(`${token}:`)
    })
  }
})
