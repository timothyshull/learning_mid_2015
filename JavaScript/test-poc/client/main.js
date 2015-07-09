/*global require*/
requirejs.config({
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        "socket.io": "../../socket.io/socket.io",
        "socket.io-stream": "../../node_modules/socket.io-stream/socket.io-stream"
    }
});
require(
    [
        "js/script.js"
    ]
);