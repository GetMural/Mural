var express = require('express');
var router = express.Router();
var fs = require('fs');

// TODO: refactor this to a storyboard model
// Set up the data API
var file = './data/storyboard.json';

router.get('/', function (req, res, next) {
    // TODO: refactor this to use storyboard model
    fs.readFile(file, 'utf8', function (err, contents) {
        if (err) {
            return next(err);
        }

        const data = JSON.parse(contents);

        res.render('preview', {
            nav: data.nav,
            items: data.items,
            meta: data.meta,
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