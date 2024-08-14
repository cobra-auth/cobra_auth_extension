const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const { DefinePlugin } = require('webpack')

require('dotenv').config({ path: './' });

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ]
});