const { src, dest, parallel, watch } = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

function js() {
  // const jQueryPlugin = new webpack.ProvidePlugin({
  //   $: 'jquery',
  //   jQuery: 'jquery',
  // });
  return src('src/client/items/HorizontalSlideshow.js')
    .pipe(
      webpackStream(
        {
          devtool: 'source-map',
          mode: 'development',
          watch: true,
          output: {
            filename: 'HorizontalSlideshow.js',
            libraryTarget: 'window',
          },
          externals: {
            jquery: 'jQuery',
          },
        },
        webpack,
      ).on('error', err => {
        console.log(err.message);
        this.emit('end'); // Recover from errors
      }),
    )
    .pipe(dest('public/'));
}

function css() {
  return src([
    'src/client/reset.css',
    'src/client/blueimp-gallery.css',
    'src/client/styles.css',
  ])
    .pipe(concat('styles.css'))
    .pipe(cleanCSS({ compatibility: 'ie11' }))
    .pipe(dest('public/'));
}

exports.js = js;
exports.css = css;

// exports.default = function() {
//   watch('src/client/*.css', css);
//   watch('src/client/items/*.js', js);
// };
