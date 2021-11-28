const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  storeImage: (arg: any) => ipcRenderer.invoke('store-image', arg),
  storeVideo: (arg: any) => ipcRenderer.invoke('store-video', arg),
  storeAudio: (arg: any) => ipcRenderer.invoke('store-audio', arg),
  openPreview: (arg: any) => ipcRenderer.invoke('open-preview', arg),
  renderPreview: (arg: any) => ipcRenderer.invoke('render-preview', arg),
  exportAsZip: (arg: any) => ipcRenderer.invoke('export-as-zip', arg),
  resetStory: () => ipcRenderer.invoke('reset-story'),
  saveAs: (arg: any) => ipcRenderer.invoke('save-as', arg),
  directories: ipcRenderer.sendSync('directories'),
  onOpenFile: (callback: (event: any, args: any) => any) => {
    ipcRenderer.removeAllListeners('open-file')
    ipcRenderer.on('open-file', (event: any, args: any) => {
      callback(event, args)
    })
  },
  onSaveAsMenuClick: (callback: any, onSaved: any) => {
    ipcRenderer.removeAllListeners('save-as-menu-click')
    ipcRenderer.removeAllListeners('saved-file-path')
    ipcRenderer.on('save-as-menu-click', (event: any) => {
      callback(event)
    })
    ipcRenderer.on('saved-file-path', (event, args) => onSaved(event, args))
  },
  onSave: (callback: any) => {
    ipcRenderer.on('save-click', callback)
  },
  toggleSave: (isDirty: boolean) => {
    ipcRenderer.send('toggle-save', isDirty)
  },
  onExport: (callback: any) => {
    ipcRenderer.on('export-click', callback)
  },
  onPreview: (callback: any) => {
    ipcRenderer.on('preview-click', callback)
  },
})
