import isElectron from 'is-electron'
console.log(1111111111111111111111, isElectron())
const configure = isElectron()
  ? require('./handleFileInput.electron')
  : // FIXME: doesn't exist yet
    require('./handleFileInput')

export default configure.default
