import electron, { BrowserWindow } from 'electron'
import exportStory, { Storyboard } from './exportFrontend'
import fs from 'fs'
import path from 'path'
import { previewDir } from './directories'
import archiver from 'archiver'

electron.app.whenReady().then(() => {
  const PREVIEW_INDEX_PATH = path.join(previewDir, 'index.html')

  let previewWindow: BrowserWindow | null = null

  electron.ipcMain.handle(
    'open-preview',
    function preview(event: electron.IpcMainInvokeEvent) {
      if (previewWindow) {
        return previewWindow.focus()
      }
      previewWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
      })
      previewWindow.loadFile(PREVIEW_INDEX_PATH)
      previewWindow.on('closed', () => {
        previewWindow = null
      })
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
      // writes index.html file
      fs.writeFileSync(PREVIEW_INDEX_PATH, indexHtmlContent)
      // if preview window is open, reload it
      if (previewWindow) {
        previewWindow.reload()
      }
    }
  )

  electron.ipcMain.handle(
    'export-as-zip',
    function (event: electron.IpcMainInvokeEvent) {
      const outputPath = electron.dialog.showSaveDialogSync({
        defaultPath: 'my-mural-website.zip',
        properties: ['createDirectory', 'showOverwriteConfirmation'],
      })
      if (!outputPath) {
        return false
      }
      const output = fs.createWriteStream(outputPath)
      const archive = archiver('zip', {
        zlib: { level: 9 },
      })
      // good practice to catch warnings (ie stat failures and other non-blocking errors)
      archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
          // log warning
        } else {
          // throw error
          throw err
        }
      })
      // good practice to catch this error explicitly
      archive.on('error', function (err) {
        throw err
      })
      archive.pipe(output)
      archive.directory(previewDir, false)
      return archive.finalize()
    }
  )
})
