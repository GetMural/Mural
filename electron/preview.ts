import electron, { BrowserWindow } from 'electron'
import exportStory, { Storyboard } from './exportFrontend'
import fs from 'fs'
import path from 'path'

electron.app.whenReady().then(() => {
  const PREVIEW_INDEX_PATH = path.join(
    electron.app.getPath('userData'),
    'preview',
    'index.html'
  )

  let previewWindow: BrowserWindow | null = null

  electron.ipcMain.handle(
    'open-preview',
    function preview(event: electron.IpcMainInvokeEvent) {
      previewWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
      })
      previewWindow.loadFile(PREVIEW_INDEX_PATH)
    }
  )
  electron.ipcMain.handle(
    'render-preview',
    function preview(
      event: electron.IpcMainInvokeEvent,
      storyboard: Storyboard
    ) {
      // generates html content
      const indexHtmlContent = exportStory(storyboard)
      console.log('rendering template', { PREVIEW_INDEX_PATH, storyboard })
      // writes index.html file
      fs.writeFileSync(PREVIEW_INDEX_PATH, indexHtmlContent)
      // if preview window is open, reload it
      if (previewWindow) {
        previewWindow.reload()
      }
    }
  )
})
