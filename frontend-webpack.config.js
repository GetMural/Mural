const path = require('path')

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'frontend-assets', 'js', 'app.js'),
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'frontend-assets-build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
          },
        ],
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
  externals: {
    'hls.js': 'Hls',
  },
}
