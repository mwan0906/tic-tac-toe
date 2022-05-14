"use strict";
const path = require('path');
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: './client/index.js',
  mode: isDev ? 'development' : 'production',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module : {
    rules : [
      {
        test : /.jsx?$/,
        loader : 'babel-loader',
        options : { presets : ['@babel/react']}

      },
      {
        test: /\.gif$/,
        use: 'url-loader?mimetype=image/gif'
      }
    ]
  },
  devtool : 'source-map'
};