import electron from 'electron'
import { removesWorkDirFolders, createsFolders } from '../directories'

export default async function resetStory(event: electron.IpcMainInvokeEvent) {
  removesWorkDirFolders()
  createsFolders()
}
