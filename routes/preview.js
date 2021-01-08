const express = require('express');
const path = require('path');
const router = express.Router();
const Storyboard = require('../models/storyboard');
const storyboard = new Storyboard();

const PUBLIC_FOLDER = path.resolve(__dirname, '..', 'public');
const MANIFEST = require(path.resolve(PUBLIC_FOLDER, 'manifest'));

router.get('/', function (req, res, next) {
  // TODO: refactor this to use storyboard model
  storyboard.readFile(function (err, data) {
    if (err) {
      console.log('There was an error reading the storyboard file: ', err);
      res.render('preview', {});
    }

    res.render('preview', {
      nav: data.nav,
      items: data.items,
      meta: data.meta,
      manifest: {
        js: MANIFEST['app.js'],
        css: MANIFEST['app.css']
      },
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
