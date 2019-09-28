const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
  constructor(opts) {
    // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    this.path = path.join(userDataPath, opts.storyName + '.json');
    this.data = parseDataFile(this.path, opts.defaults);
  }

  get(key) {
    return this.data[key];
  }
  
  set(key, val) {
    this.data[key] = val;
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.data));
    } catch (e) {
      console.log(e);
    }
  }
}

function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    // file doesn't exist
    return {};
  }
}

module.exports = Store;
