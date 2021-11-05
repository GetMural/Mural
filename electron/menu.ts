import { Menu, BrowserWindow, App, dialog, MenuItem } from 'electron'
import unzipper from 'unzipper'
import fs from 'fs'
import path from 'path'
import Crypto from 'crypto'
import {
  createsFolders,
  media,
  previewDir,
  removesWorkDirFolders,
} from './directories'

export default function createMenu(app: App, windo: BrowserWindow) {
  async function onOpenFile(event: MenuItem) {
    const outputPath = dialog.showOpenDialogSync({
      defaultPath: 'my-project.mural',
      filters: [{ name: 'Mural', extensions: ['mural'] }],
      properties: ['openFile'],
    })
    if (!outputPath) {
      return false
    }
    const tmpPath = path.join(
      app.getPath('temp'),
      'Mural-' + Crypto.randomBytes(10).toString('hex').slice(0, 10)
    )
    fs.createReadStream(outputPath[0])
      .pipe(unzipper.Extract({ path: tmpPath }))
      .on('close', () => {
        removesWorkDirFolders()
        fs.mkdirSync(previewDir)
        fs.renameSync(path.join(tmpPath, 'media'), media)
        createsFolders()
        const state = JSON.parse(
          fs.readFileSync(path.join(tmpPath, 'state.json')).toString()
        )
        windo?.webContents.send('open-file', state)
      })
  }

  const isMac = process.platform === 'darwin'
  const macMenu: Electron.MenuItemConstructorOptions[] = [
    { role: 'about' },
    { type: 'separator' },
    { role: 'services' },
    { type: 'separator' },
    { role: 'hide' },
    { role: 'hideOthers' },
    { role: 'unhide' },
    { type: 'separator' },
    { role: 'quit' },
  ]
  const fileMenu: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'Open file...',
      click: onOpenFile,
    },
    { type: 'separator' },
    {
      label: 'Save as...',
      click: async () => {
        windo?.webContents.send('save-as-menu-click')
      },
    },
    { type: 'separator' },
    isMac ? { role: 'close' } : { role: 'quit' },
  ]
  const template: Electron.MenuItemConstructorOptions[] = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: macMenu,
          },
        ]
      : []),
    {
      label: 'File',
      submenu: fileMenu,
    },
    { role: 'editMenu' },
    { role: 'viewMenu' },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://www.getmural.io/')
          },
        },
      ],
    },
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  // contextual menu
  const ctxMenu = new Menu()
  ctxMenu.append(
    new MenuItem({
      role: 'editMenu',
    })
  )
  windo.webContents.on('context-menu', (e, params) => {
    ctxMenu.popup({
      window: windo,
      x: params.x,
      y: params.y,
    })
  })
}
