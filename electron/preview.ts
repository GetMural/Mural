import electron, { BrowserWindow } from 'electron'
import exportStory, { Storyboard } from './exportFrontend'
import fs from 'fs'
import path from 'path'
import { previewDir } from './directories'
import archiver from 'archiver'
import { Server } from 'node-static'
import fp from 'find-free-port'
import http from 'http'

electron.app.whenReady().then(() => {
  const fileServer = new Server(previewDir, { cache: false })
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
      // find a free port in this range, available on localhost
      fp(4000, 5000, '127.0.0.1', function (err: any, freePort: number) {
        http
          .createServer(
            (request: http.IncomingMessage, response: http.ServerResponse) => {
              request
                .addListener('end', function () {
                  fileServer.serve(request, response)
                })
                .resume()
            }
          )
          .listen(freePort)
        if (previewWindow) {
          previewWindow.loadURL(`http://localhost:${freePort}`)
        }
      })
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
    async function (event: electron.IpcMainInvokeEvent) {
      const outputPath = electron.dialog.showSaveDialogSync({
        defaultPath: 'my-mural-website.zip',
        properties: ['createDirectory', 'showOverwriteConfirmation'],
      })
      if (!outputPath) {
        return false
      }
      event.sender.send('on-loading', true)
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
      await archive.finalize()
      event.sender.send('on-loading', false)
    }
  )
})
