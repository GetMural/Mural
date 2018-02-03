var gulp        = require('gulp');
var rename      = require('gulp-rename');
var hogan       = require('gulp-hogan');

var data        = require('./data/storyboard.json');

// Gulp Mustache Task
gulp.task('index', function() {
    console.log('Building templates');
    gulp.src('./views/preview.html', {}, '.html')
        .pipe(hogan(data, null, '.html'))
        .pipe(rename('dist/index.html'))
        .pipe(gulp.dest('public'));
});

