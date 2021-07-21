export {}
declare global {
  interface Window {
    electron: {
      storeFile: (arg: any) => Promise<any>
    }
  }
}
