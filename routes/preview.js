var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

// TODO: refactor this to a storyboard model
// Set up the data API
var filename = path.join(__dirname, '../data/storyboard.json');
var meta = {};
var items = {};

router.get('/', function (req, res, next) {
    // TODO: refactor this to use storyboard model
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) {
            console.log("There was an error reading the storyboard file: ", err)
            res.render('preview', {});
        }

        const jsonData = JSON.parse(data);

        res.render('preview', {
            nav: jsonData.nav,
            items: jsonData.items,
            meta: jsonData.meta,
            partials: {
                fb: 'partials/fb',
                head: 'partials/head',
                header: 'partials/header',
                imagebackground: 'partials/imagebackground',
                imageparallax: 'partials/imageparallax',
                intro: 'partials/intro',
                loader: 'partials/loader',
                textcentered: 'partials/textcentred',
                title: 'partials/title',
                slideshowhorizontal: 'partials/slideshowhorizontal',
                slideshowvertical: 'partials/slideshowvertical',
                snippets: 'partials/snippets',
                social: 'partials/social',
                subdataposterloadingimage: 'partials/subdataposterloadingimage',
                subvideosource: 'partials/subvideosource',
                videobackground: 'partials/videobackground',
                videofullpage: 'partials/videofullpage'
            }
        });
    });
});

module.exports = router;