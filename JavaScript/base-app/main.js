require.config({

    baseUrl: "scripts",
    shim: {
        lodash: {
            exports: "_"
        },
        "modernizr": {
            exports: "Modernizr"
        }
    },
    paths: {
        jquery: "lib/jquery",
        lodash: "lib/lodash",
        modernizr: "lib/modernizr"
    }
});

require([
    "app/load"
]);