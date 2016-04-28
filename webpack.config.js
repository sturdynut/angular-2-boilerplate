var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var prodPlugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
];

var requiredPlugins = [
  new CopyWebpackPlugin([
          { from: './src/index.html', to: '../index.html' },
      ], {
          ignore: [
              // Doesn't copy any files with a txt extension
              '*.txt',

              // Doesn't copy any file, even if they start with a dot
              { glob: '**/*', dot: true }
          ]
      })
];

var plugsToLoad = debug
  ? requiredPlugins
  : requiredPlugins.concat(prodPlugins);

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/js/index.js",
  output: {
    path: __dirname + "/dist/js",
    filename: "scripts.min.js"
  },
  plugins: plugsToLoad,
};
