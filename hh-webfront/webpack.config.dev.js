const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'templates', 'index.html')
});
const webpackMerge = require('webpack-merge');
const globalConfig = require('./webpack.config.global');

process.env.NODE_ENV = 'development';

module.exports = webpackMerge(globalConfig, {
    mode: "development",
    entry: ['./src/main.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    plugins: [htmlWebpackPlugin],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3001,
        historyApiFallback: true
    }
});