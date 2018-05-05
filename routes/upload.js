const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

const Prefernces = require('../models/preferences');
const preferences = new Prefernces(path.join(__dirname, '../data/preferences.json'));

router.post('/', function (req, res) {
    preferences.readFile(null, function(err, data) {
        if (err) {
            return res.json({"error":err});
        }

        const story = data.storyboard.split('.')[0];
        const uploadPath = path.join(__dirname,'../public/uploads/', story);

        mkdirp(uploadPath, function (err) {
            if (err) {
                res.json({"error":err});
            } else {
                req.pipe(req.busboy);
                req.busboy.on('file', function (fieldname, file, filename) {
                    console.log("Uploading: " + filename);
                    const fstream = fs.createWriteStream(path.join(uploadPath, filename));
                    file.pipe(fstream);
                    fstream.on('close', function () {
                        res.json({
                            status:"ok",
                            path: `uploads/${story}/${filename}`
                        });
                    });
                });
            }
        });
    });
});

module.exports = router;