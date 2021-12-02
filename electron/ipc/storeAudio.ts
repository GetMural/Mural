import fs from 'fs'
import { nanoid } from '@reduxjs/toolkit'
import electron from 'electron'
import path from 'path'
import slugify from 'slugify'
import { media } from '../directories'

export default async function storeAudio(
  event: electron.IpcMainInvokeEvent,
  args: {
    filename: string
  }
) {
  let buffer = fs.readFileSync(args.filename)
  const fileBasename = slugify(
    path.basename(args.filename, path.extname(args.filename))
  )
  const filename = fileBasename + '_' + nanoid() + path.extname(args.filename)
  let absolutePath = path.join(media, 'audio', filename)
  // write file to app user folder
  fs.writeFileSync(absolutePath, buffer)

  return {
    path: `audio/${filename}`,
  }
}
