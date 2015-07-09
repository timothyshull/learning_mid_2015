/*global require, console */
require.config({
    baseUrl: 'scripts'
});

// Start the main app logic.
require([/*"shirt", "shirt2","shirt3", "func"*/"common"],
    function () {
        "use strict";
        console.log("main.js require function");
    }
);