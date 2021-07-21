const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  storeFile: (arg: any) => ipcRenderer.invoke('store-file', arg),
})
