module.exports = {
    entry: ["./public/scripts/webpack-css.js", "./public/scripts/jsx-main.js"],
    output: {
        path: __dirname + "/webpack_build",
        filename: "script.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
};