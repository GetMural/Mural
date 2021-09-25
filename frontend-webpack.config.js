const path = require('path')

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'frontend-assets', 'js', 'app.js'),
  },
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

// const path = require('path')
// const webpack = require('webpack')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const ManifestPlugin = require('webpack-manifest-plugin')
// const WebpackMd5Hash = require('webpack-md5-hash')

// const extractSass = new ExtractTextPlugin({
//   filename: '[name].[contenthash].css',
// })

// module.exports = {
//   entry: {
//     app: path.resolve(__dirname, 'frontend-assets', 'js', 'app.js'),
//   },
//   devtool: 'source-map',
//   output: {
//     filename: '[name].[chunkhash].js',
//     path: path.resolve(__dirname, 'public'),
//   },
//   module: {
//     rules: [
//       {
//         test: /\.scss|\.css$/,
//         use: ExtractTextPlugin.extract({
//           fallback: 'style-loader',
//           use: [
//             {
//               loader: 'css-loader',
//               options: {
//                 // If you are having trouble with urls not resolving add this setting.
//                 // See https://github.com/webpack-contrib/css-loader#url
//                 url: false,
//                 minimize: true,
//                 sourceMap: false,
//               },
//             },
//             {
//               loader: 'sass-loader',
//               options: {
//                 sourceMap: false,
//                 includePaths: [
//                   path.resolve(__dirname, 'node_modules'),
//                   path.resolve(__dirname, 'frontend-assets', 'css'),
//                 ],
//               },
//             },
//           ],
//         }),
//       },
//       {
//         test: /\.svg$/,
//         loader: 'svg-loader',
//       },
//       {
//         test: /\.(jpe?g|png|gif|svg)$/i,
//         use: ['img-loader'],
//       },
//       {
//         test: /\.js$/,
//         // Sticky Bits didn't transpile :/
//         exclude: function (modulePath) {
//           return (
//             /node_modules/.test(modulePath) &&
//             !/node_modules\/stickybits/.test(modulePath)
//           )
//         },
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env'],
//           },
//         },
//       },
//     ],
//   },
//   plugins: [
//     extractSass,
//     // new webpack.optimize.UglifyJsPlugin({
//     //   minimize: true,
//     // }),
//     // ManifestPlugin,
//     // WebpackMd5Hash,
//   ],
//   externals: {
//     'hls.js': 'Hls',
//   },
// }
