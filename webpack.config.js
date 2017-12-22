const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  //filename: "[name].[contenthash].css",
  filename: 'app.css',
  disable: process.env.NODE_ENV === 'development'
});

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'client', 'js', 'app.js')
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'public')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss|\.css$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader?url=false' // translates CSS into CommonJS
          }, {
            loader: 'sass-loader' // compiles Sass to CSS
          }],
          // use style-loader in development
          fallback: 'style-loader' // creates style nodes from JS strings
        }),
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
      }
    ]
  },
  plugins: [
    extractSass
  ]
};

// https://github.com/van-nguyen/webpack-cdn-plugin
