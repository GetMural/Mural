import electron from 'electron'
import fs from 'fs'
import { media } from './directories'
import archiver from 'archiver'

electron.app.whenReady().then(() => {
  electron.ipcMain.handle(
    'save-as',
    function saveAs(event: electron.IpcMainInvokeEvent, reduxState) {
      const outputPath = electron.dialog.showSaveDialogSync({
        defaultPath: 'my-project.mural',
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
      archive.directory(media, 'media')
      archive.append(JSON.stringify(reduxState, null, 2), {
        name: 'state.json',
      })
      return archive.finalize().then(() => {
        event.sender.send('saved-file-path', outputPath)
      })
    }
  )
})
