import isElectron from 'is-electron'

const configure = isElectron()
  ? require('./handleVideoInput.electron')
  : // FIXME: doesn't exist yet
    require('./handleVideoInput')

export default configure.default
