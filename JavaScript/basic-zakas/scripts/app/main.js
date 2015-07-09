require.config({
    baseUrl: "scripts",
    paths: {
        historyjs: "lib/jquery.history",
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        sockjs: "lib/sockjs.js",
        text: "lib/text",
        views: "../views"
    },
    // Shim config
    shim: {
        "lib/modernizr": {
            exports: "Modernizr"
        },
        "historyjs": {
            deps: [ "jquery" ]
        }
    }
});

require(
    ["app/load"]
);