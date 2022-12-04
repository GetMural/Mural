const path = require('path')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
// const WebpackMd5Hash = require('webpack-md5-hash')

const miniCSSExtractPlugin = new MiniCssExtractPlugin({
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
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.svg$/,
        use: {
          options: {
            loader: 'svg-loader'
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: {
          options: {
            loader: 'url-loader',
            limit: 1000
          }
        }
      }
    ]
  },
  // plugins: [extractSass, new WebpackManifestPlugin(), new WebpackMd5Hash()],
  // plugins: [extractSass, new WebpackManifestPlugin()],
  plugins: [new MiniCssExtractPlugin, new WebpackManifestPlugin()],
  externals: {
    'hls.js': 'Hls',
  }
}
