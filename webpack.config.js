const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const APP_PATH = path.join(__dirname, '/app')
const BUILD_PATH = path.join(__dirname, '/dist')
const MODULE_PATH = path.join(__dirname, '/node_modules')

const config = {
  target: 'electron-main',
  // 入口配置
  entry: {
    app: './src/root.js'
  },
  // 输出配置
  output: {
    filename: 'bundle.js',
    path: BUILD_PATH
  },
  // 开启source-map调试
  devtool: 'eval-source-map',
  // 开启devServer
  devServer: {
    contentBase: BUILD_PATH,
    port: 8899,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  // 配置resolve规则
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  // 配置eslint和loaders
  module: {
    rules: [
      {
        test: /.jsx$/,
        loader: 'babel-loader',
        exclude: [MODULE_PATH]
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [MODULE_PATH]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!autoprefixer-loader',
        // exclude: [MODULE_PATH]
      },
      {
        test: /\.(jpg|jpeg|png|svg|JPG)$/,
        loader: 'url-loader',
        exclude: [MODULE_PATH]
      }
    ]
  },
  // 配置plugins
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        sourcemap: false
    }),
    new HtmlWebpackPlugin({
      title: 'react demo',
      template: './index.html'
    })
  ]
}

module.exports = config
