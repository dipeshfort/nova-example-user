const path = require('path');
const webpackMerge = require('webpack-merge');
const globalConfig = require('./webpack.config.global');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

process.env.NODE_ENV = 'production';
module.exports = webpackMerge(globalConfig, {
    mode: "production",
    entry: {
        'app': './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js($|\?)/i,
                extractComments: false,
                sourceMap: false
            })
        ]
    }
});