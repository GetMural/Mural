const webpack = require('webpack');
const { appendWebpackPlugin } = require('@rescripts/utilities');
// define child rescript
module.exports = config => {
  config.target = 'electron-renderer';
  const jQueryPlugin = new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  });
  const nodeExternalPlugins = new webpack.ExternalsPlugin(
    'commonjs',
    [
      'gulp',
      'through2',
      'gulp-clean-css',
      'mime-types',
      'uuid/v4',
      'webpack-stream',
      'vinyl-named',
    ],
  );
  let modified = appendWebpackPlugin(nodeExternalPlugins, config);
  return appendWebpackPlugin(jQueryPlugin, modified);
};
