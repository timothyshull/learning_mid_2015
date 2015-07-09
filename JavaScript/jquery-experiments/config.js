/*global require, QUnit*/
require.config({
    baseUrl: "",
    paths: {
        'QUnit': 'scripts/qunit',
        'jquery': 'scripts/jquery'
    },
    shim: {
        'QUnit': {
            exports: 'QUnit',
            init: function () {
                "use strict";
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        }
    }
});
require(["scripts/main"]);