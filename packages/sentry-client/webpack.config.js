var path = require('path');

module.exports = {
  entry: './src/App.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },
  preloaders: [
    {
      include: /client\/src\/static/,
      loader: 'file-loader',
      query: {
        name: '[path][name].[ext]'
      }
    }
  ]
};