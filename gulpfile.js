var gulp        = require('gulp');
var rename      = require('gulp-rename');
var hogan       = require('gulp-hogan');
var Storyboard = require('../models/storyboard');
var storyboard = new Storyboard();
//var data        = require('./data/stories/theme2.json');


// Gulp Mustache Task
gulp.task('index', function() {
    console.log('Building templates');
    storyboard.readFile(function (err, data) {
        gulp.src('./views/preview.html', {}, '.html')
            .pipe(hogan(data, null, '.html'))
            .pipe(rename('dist/index.html'))
            .pipe(gulp.dest('public'));
    });
});

