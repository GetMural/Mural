'use strict';

var mustache = require('mustache');
var data = require('./data/storyboard.json');
var path = require('path');

module.exports = {
  entry: {
    filename: './views/preview.html?' + JSON.stringify(data)
  },
  output: {
    filename: 'demo.html',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'mustache-loader'
      }
    ]
  }
}
