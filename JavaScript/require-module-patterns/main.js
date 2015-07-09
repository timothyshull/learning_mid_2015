/*global require, console */
require.config({
    baseUrl: 'scripts'
});

// Start the main app logic.
require(["simple-iife-var"],
    function () {
        "use strict";
        console.log("main.js require function");
    }
);