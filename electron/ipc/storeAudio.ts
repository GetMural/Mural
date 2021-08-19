import fs from 'fs'
import { nanoid } from '@reduxjs/toolkit'
import electron from 'electron'
import path from 'path'

const app = electron.app

export default async function storeAudio(
  event: electron.IpcMainInvokeEvent,
  args: {
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

  return {
    path: newPath,
  }
}
