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
        files.forEach(function (file) {
            jsonFiles.push({'name':file});
        });
        preferences.readFile(null, function(err, data) {
            res.render('index', {
                title: 'Express',
                filename: data.storyboard,
                files: jsonFiles
            });
        });
    });
});

module.exports = router;
