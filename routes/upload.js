var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.post('/', function (req, res) {
    const uploadPath = path.join(__dirname, '../public/uploads/');
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        fstream = fs.createWriteStream(path.join(uploadPath, filename));
        file.pipe(fstream);
        fstream.on('close', function () {
            res.json(JSON.parse('{"status":"ok"}'));
        });
    });
});

module.exports = router;