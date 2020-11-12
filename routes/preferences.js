const express = require('express');
const router = express.Router();
const Preferences = require('../models/preferences');
const preferences = new Preferences();


/* GET home page. */
router.get('/', function (req, res) {
    console.log('get homepage')
    preferences.readFile(null, function(err, data) {
        res.send(data);
    });
});

module.exports = router;
