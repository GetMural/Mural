const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const electron = require('electron');
const sanitize = require('sanitize-filename');
const slugify = require('@sindresorhus/slugify');

const USER_DATA_FOLDER = electron.app.getPath('userData');
const Preferences = require('../models/preferences');
const preferences = new Preferences();

router.post('/', function (req, res) {
  preferences.readFile(null, function (err, data) {
    if (err) {
      return res.json({ error: err });
    }

    const story = data.storyboard.split('.')[0];
    const uploadPath = path.join(USER_DATA_FOLDER, 'uploads', story);

    mkdirp(uploadPath, function (err) {
      if (err) {
        res.json({ error: err });
      } else {
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
          const basename = filename.split('.')[0];
          const ext = path.extname(filename);
          const uploadedFilename = `${slugify(sanitize(basename))}${ext}`;
          const fstream = fs.createWriteStream(path.join(uploadPath, uploadedFilename));
          file.pipe(fstream);
          fstream.on('close', function () {
            res.json({
              status: 'ok',
              path: `uploads/${story}/${uploadedFilename}`
            });
          });
        });
      }
    });
  });
});

module.exports = router;
