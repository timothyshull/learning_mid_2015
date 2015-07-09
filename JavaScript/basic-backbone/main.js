/*global require, define, console*/
/*jslint nomen: true*/
require.config({
    baseUrl: "js/",
    paths: {
        backbone: "lib/backbone",
        backboneLocalstorage: 'lib/backbone.localStorage',
        jquery: "lib/jquery",
        lodash: "lib/lodash",
        text: "lib/text"
    },
    shim: {
        "backbone": {
            deps: [
                "lodash",
                "jquery"
            ],
            exports: "Backbone"
        },
        backboneLocalstorage: {
            deps: [
                "backbone"
            ],
            exports: "Store"
        }
    },
    map: {
        'backbone': {
            'underscore': 'lodash'
        },
        'backboneLocalstorage': {
            'underscore': 'lodash'
        }
    }
});

require(
    [
        "jquery",
        "text!templates/template.html",
    ],
    function ($, templateMarkup) {
        "use strict";

        $("body").html(templateMarkup);

        require(
            [
                "backbone",
                "app/app",
                "routers/router"
                //"scripts/debug"
            ],
            function (Backbone, AppView, Workspace) {
                /*jshint nonew:false*/

                // Initialize routing and start Backbone.history()
                new Workspace();
                Backbone.history.start();

                // Initialize the application view
                new AppView();

                //$(".command-line-link").on("click", function (e) {
                //    e.preventDefault();
                //    app.transition("cmd-line");
                //});
            }
        );
    }
);
