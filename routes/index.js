var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const electron = require('electron');
const USER_DATA_FOLDER = electron.app.getPath('userData');

var Preferences = require('../models/preferences');
var preferences = new Preferences();

const DATA_STORIES_PATH = path.join(USER_DATA_FOLDER, 'data', 'stories');

/* GET home page. */
router.get('/', function (req, res) {
    fs.readdir(DATA_STORIES_PATH, function (err, files) {
        console.log('reading stories');
        const storyFiles = files.filter((name) => {
            return /\.json$/.test(name);
        });
        const jsonFiles = [];
        preferences.readFile(null, function(err, data) {
            storyFiles.forEach(function (file) {
                if (file !== data.storyboard) {
                    jsonFiles.push({'name':file});
                }
            });
            res.render('index', {
                title: 'Mural Editor',
                filename: data.storyboard,
                files: jsonFiles
            });
        });
    });
});

router.post('/copy-story', function (req, res) {

    let newFileName = req.body.filename
        .split(' ')
        .join('_')
        .replace(/[^A-Za-z0-9_]/g, '');
    let datestr = (new Date()).toISOString().replace(/[-T:\.Z]/g, '');
    newFileName = `${newFileName}-${datestr}.json`;

    preferences.readFile(null, function(err, data) {
        const currentStory = path.join(DATA_STORIES_PATH, data.storyboard);
        const newStory = path.join(DATA_STORIES_PATH, newFileName);
        fs.createReadStream(currentStory).pipe(fs.createWriteStream(newStory));
        data.storyboard = newFileName;
        preferences.writeFile(null, data, function(err, response) {
            if (err) {
                console.log('Error setting new preferences');
                console.log(err);
                res.send("{status: 'error'}");
            }
            console.log('New story set to preferences' + newStory);
            res.send("{status: 'ok'}");
        })
    });

});

router.delete('/delete-story', function (req, res) {
    preferences.readFile(null, function(err, data) {
        const story = data.storyboard.split('.')[0];
        console.log("deleting story", data.storyboard);
        fs.unlink(path.join(DATA_STORIES_PATH, data.storyboard), function(err) {
            if (!err) {
                const uploadPath = path.join(USER_DATA_FOLDER, 'uploads', story);
                rimraf(uploadPath, function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
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
