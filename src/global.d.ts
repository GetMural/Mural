export {}
declare global {
  interface Window {
    electron: {
      storeFile: (arg: any) => Promise<any>
    }
  }
}

declare module 'react-mui-draft-wysiwyg'
