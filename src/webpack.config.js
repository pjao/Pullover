var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var WebpackNotifierPlugin = require('webpack-notifier')

module.exports = {
  devtool: 'source-map',
  target: 'node-webkit',
  entry: {
    app: './app/Index',
    react: ['react', 'react-bootstrap', 'react-dom', 'react-redux', 'react-router', 'react-router-redux',
      'redux', 'react-addons-shallow-compare'],
    vendors: ['autorun', 'is-reachable', 'is-online', 'eyes', 'lodash', 'moment', 'nedb', 'promise', 'request', 'reselect',
      'rx', 'semver', 'striptags', 'ws', 'linkifyjs']
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].js',
    publicPath: '',
    pathinfo: true
  },
  plugins: [
    new webpack.IgnorePlugin(/^electron|bufferutil|utf\-8\-validate$/),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({name: ['react','vendors']}),
    new HtmlWebpackPlugin({
      title: 'Pullover'
    }),
    new ExtractTextPlugin('styles.css'),
    new WebpackNotifierPlugin()
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.scss', '.json']
  },
  module: {
    rules: [
      // Bootstrap fonts
      {
        test: /\.woff$/, use: 'url-loader?limit=10000&mimetype='
      + 'application/font-woff&name=./fonts/[name].[ext]'
      },
      {
        test: /\.woff2$/, use: 'url-loader?limit=10000&mimetype='
      + 'application/font-woff2&name=./fonts/[name].[ext]'
      },
      {test: /\.ttf$/, use: 'file-loader?name=./fonts/[name].[ext]'},
      {test: /\.eot$/, use: 'file-loader?name=./fonts/[name].[ext]'},
      {test: /\.svg$/, use: 'file-loader?name=./fonts/[name].[ext]'},

      // JSON
      {
        test: /\.json/,
        loader: 'json-loader'
      },

      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          plugins: ['transform-object-assign'],
          presets: [
            ['env', {
              'chrome': 56,
              'modules': false
            }], 'react'
          ]
        },
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap!' +
          'sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
        }),
        include: path.join(__dirname, 'app')
      }
    ],
  },
  watchOptions: {
    ignored: /node_modules/
  },
  stats: {
    children: false
  }
}
