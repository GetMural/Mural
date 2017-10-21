var gulp        = require('gulp');
var rename      = require('gulp-rename');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var mustache    = require('gulp-mustache');
var hogan       = require('gulp-hogan');

var data        = require('./data/storyboard.json');

// Gulp Sass Task
gulp.task('sass', function() {
  console.log('Building sass files');
  gulp.src('./views/scss/{,*/}*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'));
});

// Gulp Mustache Task
gulp.task('mustache', function() {
  console.log('Building templates');
  gulp.src('./views/preview.html', {}, '.html')
      .pipe(hogan(data, null, '.html'))
      .pipe(rename('index.html'))
      .pipe(gulp.dest('public'));
});

// Gulp watch tasks
gulp.task('watch', ['sass', 'html'], function () {
  gulp.watch('./data/**/*.json', ['mustache']);
  gulp.watch('./views/scss/**/*.scss', ['sass']);
  gulp.watch('./views/**/*.html', ['mustache']);
});
