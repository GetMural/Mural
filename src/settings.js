const electron = require('electron');
const path = require('path');
const fs = require('fs');

// Renderer process has to get `app` module via `remote`.
const USER_DATA_PATH = (electron.app || electron.remote.app).getPath(
  'userData',
);

function parseDataFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    // file doesn't exist
    return {};
  }
}

class Settings {
  constructor() {
    this.path = path.join(USER_DATA_PATH, 'settings.json');
    this.data = parseDataFile(this.path);
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

module.exports = Settings;
