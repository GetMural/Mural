const { src, dest } = require('gulp');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');

const EDITOR_TYPES = [
  'VerticalSlideshow',
  'ImageParallax',
  'CentredText',
  'HorizontalSlideshow',
  'VideoBackground',
  'ImageBackground',
];

function js() {
  return src(EDITOR_TYPES.map(type => `src/editor/items/${type}.js`))
    .pipe(named())
    .pipe(
      webpackStream({
        devtool: 'source-map',
        mode: 'development',
        watch: true,
        output: {
          libraryTarget: 'window',
        },
        externals: {
          jquery: 'jQuery',
        },
      }).on('error', err => {
        console.log(err.message);
        this.emit('end'); // Recover from errors
      }),
    )
    .pipe(dest('public/'));
}

exports.default = js;
