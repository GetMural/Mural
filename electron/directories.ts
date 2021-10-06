import isDev from 'electron-is-dev'
import path from 'path'
import electron from 'electron'
const app = electron.app

export const root = isDev
  ? path.join(app.getAppPath(), 'userFolder')
  : path.join(app.getPath('documents'), 'Mural')
export const previewDir = path.join(root, 'preview')
export const media = path.join(root, 'media')
export const image = path.join(media, 'images')
