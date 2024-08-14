const { DefinePlugin, ProvidePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const { sha256 } = require('js-sha256');
const { readFileSync } = require('fs')

const path = require('path');
const stylesheet = readFileSync('src/styles.css', 'utf8')

module.exports = {
  entry: {
    main: './src/index.tsx',
    background: './src/background.ts',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json' },
        { from: 'src/styles.css' },
        { from: 'src/images' }
      ],
    }),
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new DefinePlugin({
      "process.stylesheet": JSON.stringify({ content: stylesheet }),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'raw-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    fallback: {
      "buffer": require.resolve("buffer"),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
};
