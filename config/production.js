'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//
// Output directory and environment.
//

exports.init = (dirname) => {
  const LANG = process.env.LANG || 'en-US';
  const dist = path.join(dirname, 'public', 'dist')

  return [
  {
    name: 'JS',
    entry: path.join(dirname, 'src', 'app.js'),
    output: {
      filename: path.join(dist, 'build', 'bundle.js')
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.ProvidePlugin({
          "react": "React",
      }),
      new ExtractTextPlugin(path.join(dist, 'app.css')),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ],

    module: {
      loaders: [{
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: [
            /node_modules\/babel[\s\S]*/
          ],
          query: {
            presets: [
              require.resolve('babel-preset-es2015'),
              require.resolve('babel-preset-react')
            ]
          }
        }
      ]}
    }
  ]
}
