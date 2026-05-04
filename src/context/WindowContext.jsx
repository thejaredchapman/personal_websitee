import { createContext, useContext, useReducer, useCallback, useRef } from 'react'

const WindowContext = createContext(undefined)

const WINDOW_CONFIGS = {
  about:      { title: 'About Me',      defaultPos: { x: 80,  y: 50  }, defaultSize: { width: 660, height: 520 } },
  terminal:   { title: 'Terminal',       defaultPos: { x: 160, y: 70  }, defaultSize: { width: 760, height: 460 } },
  codecomedy: { title: 'Code & Comedy',  defaultPos: { x: 120, y: 55  }, defaultSize: { width: 820, height: 560 } },
  projects:   { title: 'Projects',       defaultPos: { x: 200, y: 45  }, defaultSize: { width: 860, height: 600 } },
  resume:     { title: 'Resume',         defaultPos: { x: 140, y: 65  }, defaultSize: { width: 780, height: 560 } },
  gallery:    { title: 'Gallery',        defaultPos: { x: 100, y: 80  }, defaultSize: { width: 820, height: 560 } },
  music:      { title: 'Music',          defaultPos: { x: 260, y: 50  }, defaultSize: { width: 420, height: 560 } },
  contact:    { title: 'Contact',        defaultPos: { x: 180, y: 60  }, defaultSize: { width: 580, height: 520 } },
  settings:   { title: 'Settings',       defaultPos: { x: 300, y: 80  }, defaultSize: { width: 440, height: 640 } },
  clippy:     { title: 'Ask Clippy',    defaultPos: { x: 220, y: 55  }, defaultSize: { width: 420, height: 560 } },
}

function buildInitialWindows() {
  const windows = {}
  for (const [id, config] of Object.entries(WINDOW_CONFIGS)) {
    windows[id] = {
      id,
      title: config.title,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { ...config.defaultPos },
      size: { ...config.defaultSize },
      zIndex: 0,
    }
  }
  return windows
}

const initialState = {
  windows: buildInitialWindows(),
  activeWindow: null,
  maxZ: 0,
  notifications: [],
  notifId: 0,
}

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN': {
      const { id } = action
      const win = state.windows[id]
      if (!win) return state
      const newZ = state.maxZ + 1
      return {
        ...state,
        maxZ: newZ,
        activeWindow: id,
        windows: {
          ...state.windows,
          [id]: { ...win, isOpen: true, isMinimized: false, zIndex: newZ },
        },
      }
    }
    case 'CLOSE': {
      const { id } = action
      const win = state.windows[id]
      if (!win) return state
      return {
        ...state,
        activeWindow: state.activeWindow === id ? null : state.activeWindow,
        windows: {
          ...state.windows,
          [id]: { ...win, isOpen: false, isMaximized: false },
        },
      }
    }
    case 'MINIMIZE': {
      const { id } = action
      const win = state.windows[id]
      if (!win) return state
      return {
        ...state,
        activeWindow: state.activeWindow === id ? null : state.activeWindow,
        windows: {
          ...state.windows,
          [id]: { ...win, isMinimized: true },
        },
      }
    }
    case 'FOCUS': {
      const { id } = action
      const win = state.windows[id]
      if (!win) return state
      const newZ = state.maxZ + 1
      return {
        ...state,
        maxZ: newZ,
        activeWindow: id,
        windows: {
          ...state.windows,
          [id]: { ...win, isMinimized: false, zIndex: newZ },
        },
      }
    }
    case 'TOGGLE_MAXIMIZE': {
      const { id } = action
      const win = state.windows[id]
      if (!win) return state
      return {
        ...state,
        windows: {
          ...state.windows,
          [id]: { ...win, isMaximized: !win.isMaximized },
        },
      }
    }
    case 'MOVE': {
      const { id, position } = action
      const win = state.windows[id]
      if (!win) return state
      return {
        ...state,
        windows: {
          ...state.windows,
          [id]: { ...win, position },
        },
      }
    }
    case 'RESIZE': {
      const { id, size } = action
      const win = state.windows[id]
      if (!win) return state
      return {
        ...state,
        windows: {
          ...state.windows,
          [id]: { ...win, size },
        },
      }
    }
    case 'CLOSE_ALL': {
      const updatedWindows = {}
      for (const [id, win] of Object.entries(state.windows)) {
        updatedWindows[id] = { ...win, isOpen: false, isMaximized: false }
      }
      return { ...state, windows: updatedWindows, activeWindow: null }
    }
    case 'MINIMIZE_ALL': {
      const updatedWindows = {}
      for (const [id, win] of Object.entries(state.windows)) {
        updatedWindows[id] = win.isOpen ? { ...win, isMinimized: true } : win
      }
      return { ...state, windows: updatedWindows, activeWindow: null }
    }
    case 'CASCADE_WINDOWS': {
      const openIds = Object.keys(state.windows).filter(id => state.windows[id].isOpen && !state.windows[id].isMinimized)
      const updatedWindows = { ...state.windows }
      openIds.forEach((id, i) => {
        updatedWindows[id] = { ...updatedWindows[id], position: { x: 60 + i * 30, y: 50 + i * 30 }, isMaximized: false }
      })
      return { ...state, windows: updatedWindows }
    }
    case 'STACK_WINDOWS': {
      const { screenW, screenH } = action
      const openIds = Object.keys(state.windows).filter(id => state.windows[id].isOpen && !state.windows[id].isMinimized)
      const updatedWindows = { ...state.windows }
      openIds.forEach((id, i) => {
        const cfg = WINDOW_CONFIGS[id]
        const w = cfg?.defaultSize?.width ?? 660
        const h = cfg?.defaultSize?.height ?? 500
        updatedWindows[id] = {
          ...updatedWindows[id],
          position: {
            x: Math.max(0, Math.floor((screenW - w) / 2) + i * 24),
            y: Math.max(28, Math.floor((screenH - 28 - 56 - h) / 2) + 28 + i * 24),
          },
          size: { width: w, height: h },
          isMaximized: false,
        }
      })
      return { ...state, windows: updatedWindows }
    }
    case 'CYCLE_WINDOW': {
      const openIds = Object.keys(state.windows).filter(id => state.windows[id].isOpen && !state.windows[id].isMinimized)
      if (openIds.length === 0) return state
      const cur = openIds.indexOf(state.activeWindow)
      const nextId = openIds[(cur + 1) % openIds.length]
      const newZ = state.maxZ + 1
      return {
        ...state,
        maxZ: newZ,
        activeWindow: nextId,
        windows: { ...state.windows, [nextId]: { ...state.windows[nextId], zIndex: newZ } },
      }
    }
    case 'ADD_NOTIFICATION': {
      const newId = state.notifId + 1
      return {
        ...state,
        notifId: newId,
        notifications: [...state.notifications, { id: newId, text: action.text }],
      }
    }
    case 'REMOVE_NOTIFICATION': {
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.id),
      }
    }
    default:
      return state
  }
}

export function WindowProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const bouncingRef = useRef(new Set())

  const openWindow = useCallback((id) => dispatch({ type: 'OPEN', id }), [])
  const closeWindow = useCallback((id) => dispatch({ type: 'CLOSE', id }), [])
  const minimizeWindow = useCallback((id) => dispatch({ type: 'MINIMIZE', id }), [])
  const focusWindow = useCallback((id) => dispatch({ type: 'FOCUS', id }), [])
  const toggleMaximize = useCallback((id) => dispatch({ type: 'TOGGLE_MAXIMIZE', id }), [])
  const moveWindow = useCallback((id, position) => dispatch({ type: 'MOVE', id, position }), [])
  const resizeWindow = useCallback((id, size) => dispatch({ type: 'RESIZE', id, size }), [])
  const closeAllWindows = useCallback(() => dispatch({ type: 'CLOSE_ALL' }), [])
  const minimizeAllWindows = useCallback(() => dispatch({ type: 'MINIMIZE_ALL' }), [])
  const cascadeWindows = useCallback(() => dispatch({ type: 'CASCADE_WINDOWS' }), [])
  const stackWindows = useCallback(() => dispatch({
    type: 'STACK_WINDOWS',
    screenW: window.innerWidth,
    screenH: window.innerHeight,
  }), [])
  const cycleWindow = useCallback(() => dispatch({ type: 'CYCLE_WINDOW' }), [])

  const dockClick = useCallback((id) => {
    const win = state.windows[id]
    if (!win) return
    if (!win.isOpen) {
      // Bounce animation tracking
      bouncingRef.current.add(id)
      setTimeout(() => bouncingRef.current.delete(id), 800)
      dispatch({ type: 'OPEN', id })
    } else if (win.isMinimized) {
      dispatch({ type: 'FOCUS', id })
    } else if (state.activeWindow === id) {
      dispatch({ type: 'MINIMIZE', id })
    } else {
      dispatch({ type: 'FOCUS', id })
    }
  }, [state.windows, state.activeWindow])

  const notify = useCallback((text) => {
    dispatch({ type: 'ADD_NOTIFICATION', text })
  }, [])

  const dismissNotification = useCallback((id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', id })
  }, [])

  return (
    <WindowContext.Provider
      value={{
        windows: state.windows,
        activeWindow: state.activeWindow,
        notifications: state.notifications,
        bouncingRef,
        openWindow,
        closeWindow,
        minimizeWindow,
        focusWindow,
        toggleMaximize,
        moveWindow,
        resizeWindow,
        closeAllWindows,
        minimizeAllWindows,
        cascadeWindows,
        stackWindows,
        cycleWindow,
        dockClick,
        notify,
        dismissNotification,
      }}
    >
      {children}
    </WindowContext.Provider>
  )
}

export function useWindows() {
  const ctx = useContext(WindowContext)
  if (!ctx) throw new Error('useWindows must be used within WindowProvider')
  return ctx
}

export { WINDOW_CONFIGS }
