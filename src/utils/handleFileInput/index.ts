import isElectron from 'is-electron'

const configure = isElectron()
  ? require('./handleFileInput.electron')
  : // FIXME: doesn't exist yet
    require('./handleFileInput')

export default configure.default
