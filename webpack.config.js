const path = require('path');
const webpack = require('webpack');
const package = require("./package.json");
const FileManagerPlugin = require('filemanager-webpack-plugin');

const distFileName = 'minitap.min.js';

const config = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'minitap.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.DefinePlugin({
      __VERSION: JSON.stringify(package.version)
    }),
    new FileManagerPlugin({
      onEnd: {
        copy: [{
          source: path.resolve(__dirname, './dist/' + distFileName),
          destination: path.resolve(__dirname, './test/' + distFileName)
        }]
      }
    })
  ]
};

module.exports = (env, args) => {
  config.mode = args.mode;

  if (args.mode === 'development') {
    config.devtool = 'sourcemap';
  } else {
    config.output.filename = distFileName;
  }

  return config;
};
