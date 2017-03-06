const { resolve } = require('path'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  entry: {
    background_scripts: "./src/background_scripts/main.js",
    popup: './src/popup/main.js',
    options: './src/options/main.js'
  },

  output: {
    path: resolve(__dirname, 'addon'),
    filename: '[name].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js'],
  },

  module: {
    rules: [
      { test: /\.pug$/, loader: 'pug-loader'},
      { test: /\.less$/, use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!less-loader"
        })
      },
      { test: /\.(png|jpg|jpeg|gif|woff2)$/, loader: 'file-loader' },
      { test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        },
        exclude: /(node_modules|bower_components)/ }
    ]
  },

  plugins: [
    new ExtractTextPlugin("[name].css"),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: 'src/popup/index.pug',
      chunksSortMode: 'dependency',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      filename: 'options.html',
      template: 'src/options/index.pug',
      chunksSortMode: 'dependency',
      chunks: ['options']
    })
  ]
};