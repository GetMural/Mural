const webpack = require('webpack');
const {appendWebpackPlugin} = require('@rescripts/utilities');
// define child rescript
module.exports = config => {
  config.target = 'electron-renderer';
  const jQueryPlugin = new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  });
  return appendWebpackPlugin(jQueryPlugin, config);
}
