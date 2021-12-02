import fs from 'fs'
import { nanoid } from '@reduxjs/toolkit'
import electron from 'electron'
import path from 'path'
import { nativeImage } from 'electron'
import slugify from 'slugify'
import keyBy from 'lodash/keyBy'
import { media } from '../directories'

const SIZES: { name: string; width?: number; height?: number }[] = [
  { name: 'square', width: 200, height: 200 },
  { name: 'small', width: 1080 },
  { name: 'medium', width: 1024 },
  { name: 'big', width: 1920 },
]

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
    media,
    'images',
    fileBasename + '_' + nanoid() + path.extname(args.filename)
  )
  // write original file
  fs.writeFileSync(newPath, buffer)
  const createdFiles = SIZES.map((size) => {
    const filename =
      fileBasename +
      '_' +
      [size?.width, size?.height].filter(Boolean).join('x') +
      '_' +
      nanoid() +
      '.jpg'
    let absolutePath = path.join(media, 'images', filename)
    const newImage = nativeImage.createFromBuffer(buffer).resize(size)

    fs.writeFileSync(absolutePath, newImage.toJPEG(90))
    return {
      path: `images/${filename}`,
      size: {
        ...newImage.getSize(),
        name: size.name,
      },
    }
  })
  return keyBy(createdFiles, (f) => f.size.name)
}
