const electron = require('electron');
const path = require('path');
const fs = require('fs');

// Renderer process has to get `app` module via `remote`.
const USER_DATA_PATH = (electron.app || electron.remote.app).getPath(
  'userData',
);

export function loadStories() {
  try {
    const files = fs.readdirSync(
      path.join(USER_DATA_PATH, 'stories'),
    );

    return files.filter(name => {
      return /\.json$/.test(name) && name !== 'settings.json';
    });
  } catch (e) {
    console.log(e);
  }
}

function parseDataFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    // file doesn't exist
    return {};
  }
}

class FileManager {
  constructor(opts) {
    this.path = path.join(
      USER_DATA_PATH,
      'stories',
      `${opts.storyName}.json`,
    );
    this.uploads = path.join(
      USER_DATA_PATH,
      'stories',
      'uploads',
      opts.storyName,
    );
  }

  read() {
    return parseDataFile(this.path);
  }

  write(snapshot) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(snapshot));
    } catch (e) {
      console.log(e);
    }
  }

  importMedia(systemPath, name) {
    try {
      fs.statSync(this.uploads);
    } catch (e) {
      fs.mkdirSync(this.uploads, { recursive: true });
    }

    const upload = path.join(this.uploads, name);
    fs.copyFileSync(systemPath, upload);
    return upload;
  }
}

export default FileManager;
