import { Storyboard } from '../electron/exportFrontend'
export {}
declare global {
  interface Window {
    MEDIA_PATH: string
    electron: {
      storeImage: (arg: any) => Promise<any>
      storeVideo: (arg: any) => Promise<any>
      storeAudio: (arg: any) => Promise<any>
      openPreview: () => Promise<any>
      renderPreview: (state: Storyboard) => Promise<any>
      directories: {
        root: string
        previewDir: string
        media: string
        image: string
      }
    }
  }
}

declare module 'react-mui-draft-wysiwyg'
