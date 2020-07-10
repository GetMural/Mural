const electron = require('electron');

const { app } = electron;
const { BrowserWindow } = electron;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
  });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );
  if (isDev) {
    // Open the DevTools.
    // BrowserWindow.addDevToolsExtension(
    //   '/Users/naaro/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.2.0_0',
    //   '/Users/naaro/Library/Application Support/Google/Chrome/Default/Extensions/pfgnfdagidkfgccljigdamigbcnndkod/0.9.21_0',
    // );
    mainWindow.webContents.openDevTools();
  }
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
