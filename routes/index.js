var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
var Prefernces = require('../models/preferences');
var preferences = new Prefernces(path.join(__dirname, '../data/preferences.json'));


/* GET home page. */
router.get('/', function (req, res) {
    fs.readdir(path.join(__dirname, "../data/stories/"), function (err, files) {
        const jsonFiles = [];
        preferences.readFile(null, function(err, data) {
            files.forEach(function (file) {
                if (file !== data.storyboard) {
                    jsonFiles.push({'name':file});
                }
            });
            res.render('index', {
                title: 'Express',
                filename: data.storyboard,
                files: jsonFiles
            });
        });
    });
});

router.post('/copy-story', function (req, res) {
    const newFileName = req.body.filename;
    preferences.readFile(null, function(err, data) {
        console.log("copying story", data.storyboard, newFileName);
        fs.createReadStream(path.join(__dirname, "../data/stories/", data.storyboard))
          .pipe(fs.createWriteStream(path.join(__dirname, "../data/stories/", newFileName)));
        data.storyboard = newFileName;
        preferences.writeFile(null, data, function(err, response) {
            if (err) {
                console.log('Error setting new preferences', err);
                res.send("{status: 'error'}");
            }
            console.log('New story set to preferences');
            res.send("{status: 'ok'}");
        })
    });

});

router.delete('/delete-story', function (req, res) {
    preferences.readFile(null, function(err, data) {
        console.log("deleting story", data.storyboard);
        fs.unlink(path.join(__dirname, "../data/stories/", data.storyboard), function(err) {
            if (!err) {
                data.storyboard = 'default.json'
                preferences.writeFile(null, data, function(err, response) {
                    console.log('New story set to preferences');
                    console.log("story deleted.")
                    res.send("{status: 'ok'}");
                })
            } else {
                console.log("Error deleting story", filename)
                res.send("{status: 'error'}");
            }
        });
    });

});

module.exports = router;
