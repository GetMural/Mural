const electron = require('electron');
const path = require('path');
const fs = require('fs');

// Renderer process has to get `app` module via `remote`.
const USER_DATA_PATH = (electron.app || electron.remote.app).getPath(
  'userData',
);

const STORIES_PATH = path.join(USER_DATA_PATH, 'stories');

export function loadStories() {
  try {
    try {
      fs.statSync(STORIES_PATH);
      const files = fs.readdirSync(STORIES_PATH);
      return files.filter(name => {
        return /\.json$/.test(name) && name !== 'settings.json';
      });
    } catch (e) {
      fs.mkdirSync(STORIES_PATH, { recursive: true });
      return [];
    }
  } catch (e) {
    console.log(e);
    return [];
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
    this.readOnly = !!opts.readOnly;
  }

  read() {
    return parseDataFile(this.path);
  }

  write(snapshot) {
    if (!this.readOnly) {
      try {
        fs.writeFileSync(this.path, JSON.stringify(snapshot));
      } catch (e) {
        console.log(e);
      }
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
