import electron from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import {
  root,
  previewDir,
  media,
  image,
  video,
  audio,
  createsFolders,
} from './directories'
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
  mainWindow.webContents.setWindowOpenHandler(({ url, referrer }) => {
    if (
      (isDev && url.indexOf(referrer.url) === -1) ||
      (!isDev && !url.startsWith('file:///'))
    ) {
      electron.shell.openExternal(url)
      return { action: 'deny' }
    }
    return { action: 'allow' }
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
  createsFolders()
})

require('./preview')

// others ipc
electron.ipcMain.handle('store-image', require('./ipc/storeImage').default)
electron.ipcMain.handle('store-video', require('./ipc/storeVideo').default)
electron.ipcMain.handle('store-audio', require('./ipc/storeAudio').default)
electron.ipcMain.handle('reset-story', require('./ipc/resetStory').default)
electron.ipcMain.on('directories', (event, arg) => {
  event.returnValue = {
    root,
    previewDir,
    media,
    image,
    video,
    audio,
  }
})
