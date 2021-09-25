import { Storyboard } from '../electron/exportFrontend'
export {}
declare global {
  interface Window {
    electron: {
      storeImage: (arg: any) => Promise<any>
      storeVideo: (arg: any) => Promise<any>
      storeAudio: (arg: any) => Promise<any>
      openPreview: () => Promise<any>
      renderPreview: (state: Storyboard) => Promise<any>
    }
  }
}

declare module 'react-mui-draft-wysiwyg'
