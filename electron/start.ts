import electron from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import fs from 'fs'
import storeImage from './ipc/storeImage'
import storeVideo from './ipc/storeVideo'
import storeAudio from './ipc/storeAudio'

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow: Electron.BrowserWindow | null | undefined

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 1000,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // nodeIntegration: true,
      // contextIsolation: false,
      // enableRemoteModule: true,
      webSecurity: false,
    },
  })
  await mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../../build/index.html')}`
  )
  // open external link in browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    electron.shell.openExternal(url)
    return { action: 'deny' }
  })
  mainWindow.webContents.on('new-window', function (e, url) {
    e.preventDefault()
    require('electron').shell.openExternal(url)
  })
  // Devtools
  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require('electron-devtools-installer')
    installExtension(REACT_DEVELOPER_TOOLS)
    installExtension(REDUX_DEVTOOLS)
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
  }
  mainWindow.on('closed', () => (mainWindow = null))
}

// app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.whenReady().then(() => {
  createWindow()
  /**
   * Creates user folder if doesn't exist and store its path in `userData`
   */
  const root = path.join(app.getPath('documents'), 'Mural')
  const folders = [root, path.join(root, 'thumbnails')]
  folders.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
  })
  app.setPath('userData', root)
})

// ipc
electron.ipcMain.handle('store-image', storeImage)
electron.ipcMain.handle('store-video', storeVideo)
electron.ipcMain.handle('store-audio', storeAudio)
