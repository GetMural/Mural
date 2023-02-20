const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

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
    publicPath: '',
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.scss|\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: {
          options: {
            loader: 'svg-loader',
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: {
          options: {
            loader: 'url-loader',
            limit: 1000,
          },
        },
      },
    ],
  },
  plugins: [miniCSSExtractPlugin, new WebpackManifestPlugin()],
  externals: {
    'hls.js': 'Hls',
  },
}
