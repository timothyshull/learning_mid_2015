/*jslint nomen: true*/
/*global module, __dirname, webpack*/
var webpack = require("webpack");

module.exports = {
    entry: "./scripts/main.js",
    devtool: "source-map",
    output: {
        path: __dirname,
        filename: "build.js",
        publicPath: "/"
    },
    loaders: [
        {
            test: /[\\\/]scripts[\\\/]lib[\\\/]modernizr\.js$/,
            loader: "imports?this=>window!exports?window.Modernizr"
        }
    ],
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};