var express = require('express');
var router = express.Router();
var fs = require('fs');

// TODO: refactor this to a storyboard model
// Set up the data API
var data = './data/storyboard.json';
var meta = {};
var items = {};

router.get('/', function (req, res, next) {
    // TODO: refactor this to use storyboard model
    fs.readFile(data, 'utf8', function (err, data) {
        if (!err) {
            meta = JSON.parse(data).meta;
            items = JSON.parse(data).items;
        }

        res.render('preview', {
            items: items,
            meta: meta,
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