const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  storeImage: (arg: any) => ipcRenderer.invoke('store-image', arg),
  storeVideo: (arg: any) => ipcRenderer.invoke('store-video', arg),
})
