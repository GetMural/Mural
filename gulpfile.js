const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const cleanCSS = require('gulp-clean-css');

function js() {
  const jQueryPlugin = new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  });
  return gulp
    .src('src/client/items/HorizontalSlideshow.js')
    .pipe(
      webpackStream(
        {
          watch: true,
          devtool: 'source-map',
          mode: 'development',
          output: { filename: 'HorizontalSlideshow.js' },
          plugins: [jQueryPlugin],
        },
        webpack,
      ).on('error', err => {
        console.log(err.message);
        this.emit('end'); // Recover from errors
      }),
    )
    .pipe(gulp.dest('public/'));
}

exports.js = js;
