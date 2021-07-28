export {}
declare global {
  interface Window {
    electron: {
      storeImage: (arg: any) => Promise<any>
      storeVideo: (arg: any) => Promise<any>
    }
  }
}

declare module 'react-mui-draft-wysiwyg'
