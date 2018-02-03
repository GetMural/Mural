var express = require('express');
var router = express.Router();
var fs = require('fs');

// Public View
router.get('/', function (req, res) {
    res.render('../public/dist/index.html');
});

module.exports = router;
