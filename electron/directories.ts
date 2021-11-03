import isDev from 'electron-is-dev'
import path from 'path'
import electron from 'electron'
import fs from 'fs-extra'
const app = electron.app

export const root = isDev
  ? path.join(app.getAppPath(), 'userFolder')
  : path.join(app.getPath('documents'), 'Mural')
export const previewDir = path.join(root, 'preview')
export const media = path.join(previewDir, 'media')
export const image = path.join(media, 'images')
export const audio = path.join(media, 'audio')
export const video = path.join(media, 'video')

/**
 * Creates user folder if doesn't exist
 */
export function createsFolders() {
  // order matters. Parents first
  ;[root, previewDir, media, image, audio, video].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
  })
  fs.copySync(path.join(app.getAppPath(), 'frontend-assets'), previewDir, {
    overwrite: true,
  })
  fs.copySync(
    path.join(app.getAppPath(), 'frontend-assets-build'),
    previewDir,
    { overwrite: true }
  )
}

export function removesWorkDirFolders() {
  fs.rmSync(previewDir, { force: true, recursive: true })
}
