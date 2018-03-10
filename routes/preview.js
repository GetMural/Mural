var express = require('express');
var router = express.Router();
var Storyboard = require('../models/storyboard');
var storyboard = new Storyboard();

router.get('/', function (req, res, next) {
    // TODO: refactor this to use storyboard model
    storyboard.readFile(function (err, data) {
        if (err) {
            console.log("There was an error reading the storyboard file: ", err);
            res.render('preview', {});
        }

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