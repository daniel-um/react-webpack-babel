const path = require('path');
module.exports = {
  mode: 'development',
  entry: './index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // regex for all js files in project
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: { // equiv to babel.config.json
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  }
}