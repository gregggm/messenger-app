const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './client/src/index.js',

  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js'
	},

  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      filename: 'index.html'
    })
  ]
};

module.exports = config;
