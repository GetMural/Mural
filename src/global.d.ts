export {}
declare global {
  interface Window {
    electron: {
      doThing: () => void
    }
  }
}
