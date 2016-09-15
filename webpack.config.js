'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//
// Output directory and environment.
//
const dist = path.join(__dirname, 'public', 'dist');
const env = process.env.NODE_ENV || 'development';
const LANG = process.env.LANG || 'en-US';
const variables = {};

module.exports = [
{
  name: 'JS',
  devtool: 'source-map',
  entry: path.join(__dirname, 'src', 'app.js'),
  output: {
    filename: path.join(dist, 'build', 'bundle.js')
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    }),
    new webpack.ProvidePlugin({
        "react": "React",
    }),
    new ExtractTextPlugin(path.join(dist, 'app.css'))
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
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader')
      }
    ]}
  }
]
