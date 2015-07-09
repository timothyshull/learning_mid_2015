require.config({
    baseUrl: "",
    paths: {
        "jasmine": "lib/jasmine-2.3.4/jasmine",
        "jasmine-html": "lib/jasmine-2.3.4/jasmine-html",
        "boot": "lib/jasmine-2.3.4/boot"
    },
    shim: {
        "jasmine": {
            exports: "window.jasmineRequire"
        },
        "jasmine-html": {
            deps: ["jasmine"],
            exports: "window.jasmineRequire"
        },
        "boot": {
            deps: ["jasmine", "jasmine-html"],
            exports: "window.jasmineRequire"
        }
    }
});

var specs = [
    //"spec/PlayerSpec"
    "spec/FunctionSpec"
];

require(["boot"], function () {
    require(specs, function () {
        window.onload();
    });
});