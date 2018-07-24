/* global __dirname, module, require */

const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: __dirname + '/src/',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'pbj.js',
    path: __dirname + '/build'
  },
  plugins: [
    HTMLWebpackPluginConfig
  ],
  devServer: {
    host: '0.0.0.0',
    overlay: true,
    port: 3000,
    stats: 'minimal'
  }
};
