/*
    Here the modules of the app are loaded.
    First goes the core, than controllers, then models and finally views
 */


define(
    [
        // Core
        "app/core",
        "underscore",
        "modules/module-manager/module-manager-controller",
        "modules/module-manager/module-manager-model",
        "modules/module-manager/module-manager-view",
        // "historyjs",
        // "utility/AppUtility",


        // Controllers
        //"modules/layout-controller",
        //"modules/header-controller",
        "modules/body-controller",
        //"modules/footer-controller",

        // Models
        //"modules/layout-model",
        //"modules/header-model",
        "modules/body-model",
        //"modules/footer-model",

        // Views
        //"modules/layout-view",
        //"modules/header-view",
        "modules/body-view"
        //"modules/footer-view",
    ],
    function (core, _) {
        "use strict";

        //var host = window.location.host;

        _.templateSettings.variable = "template";

         core.configureView("body", "main", function () { return document.body; });

        // if (serverConfig.useExternalConnection && typeof serverConfig.externalDomain === "string") {
        //     host = serverConfig.externalDomain;
        // }

        // Set communicator based on host where the app is running on.
        // if (AppUtility.useWebSockets()) {
        //     core.start("websockets-communicator");
        // } else {
        //     core.start("rest-communicator");
        // }

        // Start basic modules - module manager and hash modules. They will manage the rest
        core.start("module-manager");
        core.start("router");
    }
);