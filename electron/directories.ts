import isDev from 'electron-is-dev'
import path from 'path'
import electron from 'electron'
import fs from 'fs'
import fse from 'fs-extra'

const app = electron.app

export const root = isDev
  ? path.join(app.getAppPath(), 'userFolder')
  : app.getPath('userData')
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
    if (!fse.existsSync(dir)) {
      fse.mkdirSync(dir)
    }
  })
  // NOTE: fse doesn't work well with subfolders and ASAR (EACCES: permission denied)
  copyFolder(path.join(app.getAppPath(), 'frontend-assets'), previewDir)
  fse.copySync(
    path.join(app.getAppPath(), 'frontend-assets-build'),
    previewDir,
    { overwrite: true }
  )
}

export function removesWorkDirFolders() {
  fse.rmSync(previewDir, { force: true, recursive: true })
}

function copyFolder(parent: string, target: string) {
  fs.readdirSync(parent).forEach((fileOrFolder) => {
    const child = path.join(parent, fileOrFolder)
    const targetChild = path.join(target, fileOrFolder)
    fs.rmSync(targetChild, { recursive: true, force: true })
    if (fs.lstatSync(child).isDirectory()) {
      fs.mkdirSync(targetChild)
      copyFolder(child, targetChild)
    }
    if (fs.lstatSync(child).isFile()) {
      fs.copyFileSync(child, targetChild)
    }
  })
}
