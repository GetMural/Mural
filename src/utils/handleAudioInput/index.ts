import isElectron from 'is-electron'

const configure = isElectron()
  ? require('./handleAudioInput.electron')
  : // FIXME: doesn't exist yet
    require('./handleAudioInput')

export default configure.default
