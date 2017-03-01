var path = require('path');

module.exports = {
  entry: './src/client/App.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      include: './src/client',
      loader: 'babel'
    }]
  }
};