import isElectron from 'is-electron'

const configure = isElectron()
  ? require('./handleImageInput.electron')
  : // FIXME: doesn't exist yet
    require('./handleImageInput')

export default configure.default
