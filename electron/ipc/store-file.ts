import fs from 'fs'
import { nanoid } from '@reduxjs/toolkit'
import electron from 'electron'
import path from 'path'

// import for sharps has to be like that, in
// order to prevent a typescript error
// see: https://github.com/electron/electron/issues/10167#issuecomment-503435031
// import sharp from 'sharp'
const sharp = require('sharp')

const app = electron.app

export default async function storeFile(
  event: electron.IpcMainInvokeEvent,
  args: {
    name: string
    filename: string
  }
) {
  let buffer = fs.readFileSync(args.filename)
  //   write file to app user folder
  let newPath = path.join(
    app.getPath('userData'),
    nanoid() + path.basename(args.filename)
  )
  fs.writeFileSync(newPath, buffer)
  // generates thumbnail to show
  let thumbnailPath = path.join(
    app.getPath('userData'),
    'thumbnails',
    nanoid() + path.basename(args.filename) + '.jpg'
  )
  await sharp(buffer).resize(200).jpeg({ mozjpeg: true }).toFile(thumbnailPath)
  // .toBuffer()

  return {
    thumbnail: thumbnailPath,
    path: newPath,
  }
}
