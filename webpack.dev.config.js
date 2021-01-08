const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css'
});

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'client', 'js', 'app.js')
  },
  devtool: 'source-map',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, './public')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'hogan'
      },
      {
        test: /\.svg$/,
        loader: 'svg-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'img-loader'
        ]
      },
      {
        test: /\.js$/,
        // Sticky Bits didn't transpile :/
        exclude: function (modulePath) {
          return /node_modules/.test(modulePath) &&
            !/node_modules\/stickybits/.test(modulePath);
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
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
                minimize: true,
                sourceMap: false
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
                includePaths: [
                  path.resolve(__dirname, 'node_modules'),
                  path.resolve(__dirname, 'client', 'css')
                ]
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    extractSass,
    new ManifestPlugin(),
    new WebpackMd5Hash(),
    new HtmlWebpackPlugin({
      filename: './views/preview.html',
      output: 'TEST.html'
    })
  ],
  externals: {
    'hls.js': 'Hls'
  }
};
