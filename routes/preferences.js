const express = require('express');
const router = express.Router();
const Preferences = require('../models/preferences');
const preferences = new Preferences();

/* GET home page. */
router.get('/', function (req, res) {
  console.log('get homepage');
  preferences.readFile(null, function (err, data) {
    if (err) {
      console.log(err.stack);
    };
    res.send(data);
  });
});

module.exports = router;
