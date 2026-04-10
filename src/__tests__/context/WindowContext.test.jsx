import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, act } from '@testing-library/react'
import { WindowProvider, useWindows, WINDOW_CONFIGS } from '../../context/WindowContext'

function TestConsumer({ onRender }) {
  const ctx = useWindows()
  onRender(ctx)
  return null
}

function renderWithProvider(onRender) {
  return render(
    <WindowProvider>
      <TestConsumer onRender={onRender} />
    </WindowProvider>
  )
}

describe('WindowContext — initial state', () => {
  it('all windows start closed', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    for (const id of Object.keys(WINDOW_CONFIGS)) {
      expect(ctx.windows[id].isOpen).toBe(false)
      expect(ctx.windows[id].isMinimized).toBe(false)
      expect(ctx.windows[id].isMaximized).toBe(false)
    }
  })

  it('activeWindow starts null', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    expect(ctx.activeWindow).toBeNull()
  })

  it('each window has correct title from WINDOW_CONFIGS', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    expect(ctx.windows.about.title).toBe('About Me')
    expect(ctx.windows.terminal.title).toBe('Terminal')
    expect(ctx.windows.contact.title).toBe('Contact')
    expect(ctx.windows.clippy.title).toBe('Ask Clippy')
  })

  it('each window has default position and size from WINDOW_CONFIGS', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    expect(ctx.windows.about.position).toEqual(WINDOW_CONFIGS.about.defaultPos)
    expect(ctx.windows.about.size).toEqual(WINDOW_CONFIGS.about.defaultSize)
    expect(ctx.windows.projects.position).toEqual(WINDOW_CONFIGS.projects.defaultPos)
  })

  it('notifications array starts empty', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    expect(ctx.notifications).toEqual([])
  })

  it('all 10 expected windows exist', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    const ids = ['about', 'terminal', 'codecomedy', 'projects', 'resume', 'gallery', 'music', 'contact', 'settings', 'clippy']
    for (const id of ids) {
      expect(ctx.windows[id]).toBeDefined()
    }
  })
})

describe('WindowContext — openWindow', () => {
  it('opens a window and sets activeWindow', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.openWindow('about'))
    expect(ctx.windows.about.isOpen).toBe(true)
    expect(ctx.activeWindow).toBe('about')
  })

  it('sets isMinimized to false when opening', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => {
      ctx.openWindow('terminal')
      ctx.minimizeWindow('terminal')
      ctx.openWindow('terminal')
    })
    expect(ctx.windows.terminal.isMinimized).toBe(false)
  })

  it('increments zIndex on open', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.openWindow('about'))
    const z1 = ctx.windows.about.zIndex
    act(() => ctx.openWindow('terminal'))
    expect(ctx.windows.terminal.zIndex).toBeGreaterThan(z1)
  })

  it('opening second window gives it higher zIndex', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.openWindow('about'))
    const z1 = ctx.windows.about.zIndex
    act(() => ctx.openWindow('terminal'))
    expect(ctx.windows.terminal.zIndex).toBeGreaterThan(z1)
  })

  it('does nothing for invalid window id', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.openWindow('nonexistent'))
    expect(ctx.activeWindow).toBeNull()
  })
})

describe('WindowContext — closeWindow', () => {
  it('closes an open window', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.openWindow('about'))
    act(() => ctx.closeWindow('about'))
    expect(ctx.windows.about.isOpen).toBe(false)
  })

  it('clears activeWindow when closing the active window', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.openWindow('about'))
    expect(ctx.activeWindow).toBe('about')
    act(() => ctx.closeWindow('about'))
    expect(ctx.activeWindow).toBeNull()
  })

  it('does not clear activeWindow when closing a non-active window', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => {
      ctx.openWindow('about')
      ctx.openWindow('terminal')
    })
    expect(ctx.activeWindow).toBe('terminal')
    act(() => ctx.closeWindow('about'))
    expect(ctx.activeWindow).toBe('terminal')
  })

  it('also resets isMaximized on close', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => {
      ctx.openWindow('projects')
      ctx.toggleMaximize('projects')
    })
    expect(ctx.windows.projects.isMaximized).toBe(true)
    act(() => ctx.closeWindow('projects'))
    expect(ctx.windows.projects.isMaximized).toBe(false)
  })
})

describe('WindowContext — minimizeWindow', () => {
  it('minimizes an open window', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.openWindow('terminal'))
    act(() => ctx.minimizeWindow('terminal'))
    expect(ctx.windows.terminal.isMinimized).toBe(true)
  })

  it('clears activeWindow when minimizing the active window', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.openWindow('terminal'))
    act(() => ctx.minimizeWindow('terminal'))
    expect(ctx.activeWindow).toBeNull()
  })

  it('keeps activeWindow when minimizing a non-active window', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => {
      ctx.openWindow('about')
      ctx.openWindow('terminal')
    })
    act(() => ctx.minimizeWindow('about'))
    expect(ctx.activeWindow).toBe('terminal')
  })
})

describe('WindowContext — focusWindow', () => {
  it('sets a window as active', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => {
      ctx.openWindow('about')
      ctx.openWindow('terminal')
      ctx.focusWindow('about')
    })
    expect(ctx.activeWindow).toBe('about')
  })

  it('unminimizes a minimized window on focus', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => {
      ctx.openWindow('about')
      ctx.minimizeWindow('about')
      ctx.focusWindow('about')
    })
    expect(ctx.windows.about.isMinimized).toBe(false)
  })

  it('gives focused window the highest zIndex', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => {
      ctx.openWindow('about')
      ctx.openWindow('terminal')
      ctx.openWindow('projects')
      ctx.focusWindow('about')
    })
    const zAbout = ctx.windows.about.zIndex
    const zTerminal = ctx.windows.terminal.zIndex
    const zProjects = ctx.windows.projects.zIndex
    expect(zAbout).toBeGreaterThan(zTerminal)
    expect(zAbout).toBeGreaterThan(zProjects)
  })
})

describe('WindowContext — toggleMaximize', () => {
  it('maximizes a non-maximized window', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.openWindow('projects'))
    act(() => ctx.toggleMaximize('projects'))
    expect(ctx.windows.projects.isMaximized).toBe(true)
  })

  it('restores a maximized window', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.openWindow('projects'))
    act(() => ctx.toggleMaximize('projects'))
    act(() => ctx.toggleMaximize('projects'))
    expect(ctx.windows.projects.isMaximized).toBe(false)
  })
})

describe('WindowContext — moveWindow / resizeWindow', () => {
  it('updates window position', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.openWindow('about'))
    act(() => ctx.moveWindow('about', { x: 300, y: 200 }))
    expect(ctx.windows.about.position).toEqual({ x: 300, y: 200 })
  })

  it('updates window size', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.openWindow('about'))
    act(() => ctx.resizeWindow('about', { width: 900, height: 700 }))
    expect(ctx.windows.about.size).toEqual({ width: 900, height: 700 })
  })
})

describe('WindowContext — notifications', () => {
  it('adds a notification', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.notify('Hello world'))
    expect(ctx.notifications).toHaveLength(1)
    expect(ctx.notifications[0].text).toBe('Hello world')
  })

  it('adds multiple notifications with unique ids', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => {
      ctx.notify('First')
      ctx.notify('Second')
    })
    expect(ctx.notifications).toHaveLength(2)
    const ids = ctx.notifications.map((n) => n.id)
    expect(new Set(ids).size).toBe(2)
  })

  it('dismisses a notification by id', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.notify('To dismiss'))
    const id = ctx.notifications[0].id
    act(() => ctx.dismissNotification(id))
    expect(ctx.notifications).toHaveLength(0)
  })

  it('only removes the targeted notification', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => {
      ctx.notify('Keep me')
      ctx.notify('Remove me')
    })
    const removeId = ctx.notifications[1].id
    act(() => ctx.dismissNotification(removeId))
    expect(ctx.notifications).toHaveLength(1)
    expect(ctx.notifications[0].text).toBe('Keep me')
  })
})

describe('WindowContext — dockClick', () => {
  it('opens a closed window', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.dockClick('about'))
    expect(ctx.windows.about.isOpen).toBe(true)
  })

  it('minimizes the active open window on second click', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.dockClick('about'))
    expect(ctx.activeWindow).toBe('about')
    act(() => ctx.dockClick('about'))
    expect(ctx.windows.about.isMinimized).toBe(true)
  })

  it('focuses an already-open non-active window', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => {
      ctx.dockClick('about')
      ctx.dockClick('terminal')
    })
    expect(ctx.activeWindow).toBe('terminal')
    act(() => ctx.dockClick('about'))
    expect(ctx.activeWindow).toBe('about')
  })

  it('restores a minimized window', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.dockClick('about'))
    act(() => ctx.minimizeWindow('about'))
    expect(ctx.windows.about.isMinimized).toBe(true)
    act(() => ctx.dockClick('about'))
    expect(ctx.windows.about.isMinimized).toBe(false)
  })
})

describe('WindowContext — useWindows throws outside provider', () => {
  it('throws if used outside WindowProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => {
      render(<TestConsumer onRender={() => {}} />)
    }).toThrow('useWindows must be used within WindowProvider')
    spy.mockRestore()
  })
})
