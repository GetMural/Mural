const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')

const extractSass = new ExtractTextPlugin({
  filename: '[name].[hash].css',
})

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'frontend-assets', 'js', 'app.js'),
  },
  output: {
    path: path.resolve(__dirname, 'frontend-assets-build'),
    filename: '[name].[chunkhash].js',
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.scss|\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                // If you are having trouble with urls not resolving add this setting.
                // See https://github.com/webpack-contrib/css-loader#url
                url: false,
                sourceMap: false,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
              },
            },
          ],
        }),
      },
      {
        test: /\.svg$/,
        loader: 'svg-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        // use: ['img-loader'],
        loader: 'url-loader?limit=10000',
      },
    ],
  },
  plugins: [extractSass, new WebpackManifestPlugin(), new WebpackMd5Hash()],
  externals: {
    'hls.js': 'Hls',
  },
}
