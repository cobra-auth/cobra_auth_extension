const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { DefinePlugin } = require('webpack')

require('dotenv').config({ path: './_development.env' });

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    client: {
      logging: 'info',
      overlay: true,
    },
    compress: true,
    open: true,
    static: './build',
  },
  stats: {
    errorDetails: true,
  },
  plugins: [
    new DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ]
});
