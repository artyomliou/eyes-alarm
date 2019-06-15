const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

  mode: 'production',

  optimization: {
    minimize: false,
  },

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
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff2)$/,
        use: 'file-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            compact: false,
            minified: false,
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
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