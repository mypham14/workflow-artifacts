import '@testing-library/jest-dom/vitest'

const createStorage = () => {
  let store = {}

  return {
    getItem(key) {
      const value = store[key]
      return value === undefined ? null : value
    },
    setItem(key, value) {
      store[key] = String(value)
    },
    removeItem(key) {
      delete store[key]
    },
    clear() {
      store = {}
    },
    key(index) {
      return Object.keys(store)[index] ?? null
    },
    get length() {
      return Object.keys(store).length
    },
  }
}

const storage = createStorage()

Object.defineProperty(globalThis, 'localStorage', {
  value: storage,
  configurable: true,
})

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    value: storage,
    configurable: true,
  })
}
