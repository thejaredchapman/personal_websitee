import '@testing-library/jest-dom'

// Node 25+ ships a built-in global `localStorage`. Without a
// `--localstorage-file` path it is an empty object with no methods, and it
// shadows jsdom's Storage — so point the global back at jsdom's.
if (typeof globalThis.localStorage?.clear !== 'function') {
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: globalThis.jsdom.window.localStorage,
  })
}

// jsdom doesn't implement matchMedia — provide a stub
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
