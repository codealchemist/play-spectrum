const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png'
      }
    ]
  },
  target: 'web',
  node: {
    fs: 'empty'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [new webpack.EnvironmentPlugin(['URL_SHORTENER_KEY'])]
}
