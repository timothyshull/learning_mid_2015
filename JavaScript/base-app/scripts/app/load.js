/*global define */
define(
    [
        "app/core",
        "utility/AppUtility",
        "modules/module1/module1",
        "modules/module1/module1.view",
        "modules/module1/module1.model"
    ],
    function (core, AppUtility, module1) {
        "use strict";

        // Initialization of underscore template parameters
        var host = window.location.host,
            externalDomain,
            useExternalConnection = !host || AppUtility.connectionFlexible();

        _.templateSettings.variable = "template";

        core.configureView("module1", "main", function () { return document.getElementById("main-elem"); });

        if (window.location.hash.indexOf("EXT") >= 0) {
            useExternalConnection = true;
        }

        if (window.location.hash.indexOf("INT") >= 0) {
            useExternalConnection = false;
        }

        if (useExternalConnection && typeof externalDomain === "string") {
            host = externalDomain;
        }

        // Start basic modules - module manager and hash modules. They will manage the rest
        core.start("module-manager");
        core.start("hash");
    }
);