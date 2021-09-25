const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  storeImage: (arg: any) => ipcRenderer.invoke('store-image', arg),
  storeVideo: (arg: any) => ipcRenderer.invoke('store-video', arg),
  storeAudio: (arg: any) => ipcRenderer.invoke('store-audio', arg),
  openPreview: (arg: any) => ipcRenderer.invoke('open-preview', arg),
  renderPreview: (arg: any) => ipcRenderer.invoke('render-preview', arg),
})
