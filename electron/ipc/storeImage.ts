import fs from 'fs'
import { nanoid } from '@reduxjs/toolkit'
import electron from 'electron'
import path from 'path'
import { nativeImage } from 'electron'
import slugify from 'slugify'
import keyBy from 'lodash/keyBy'

const SIZES: { name: string; width?: number; height?: number }[] = [
  { name: 'square', width: 200, height: 200 },
  { name: 'small', width: 200 },
  { name: 'medium', width: 600 },
  { name: 'big', width: 1200 },
]

const app = electron.app
export default async function storeImage(
  event: electron.IpcMainInvokeEvent,
  args: {
    // name: string
    filename: string
  }
) {
  const fileBasename = slugify(
    path.basename(args.filename, path.extname(args.filename))
  )
  let buffer = fs.readFileSync(args.filename)
  //   write file to app user folder
  let newPath = path.join(
    app.getPath('userData'),
    'media',
    'images',
    fileBasename + '_' + nanoid() + path.extname(args.filename)
  )
  // write original file
  fs.writeFileSync(newPath, buffer)
  const createdFiles = SIZES.map((size) => {
    let relativePath = path.join(
      'images',
      fileBasename +
        '_' +
        [size?.width, size?.height].filter(Boolean).join('x') +
        '_' +
        nanoid() +
        '.jpg'
    )
    let absolutePath = path.join(app.getPath('userData'), 'media', relativePath)
    const newImage = nativeImage.createFromBuffer(buffer).resize(size)

    fs.writeFileSync(absolutePath, newImage.toJPEG(90))
    return {
      path: relativePath,
      size: {
        ...newImage.getSize(),
        name: size.name,
      },
      original: args.filename,
    }
  })
  return keyBy(createdFiles, (f) => f.size.name)
}
