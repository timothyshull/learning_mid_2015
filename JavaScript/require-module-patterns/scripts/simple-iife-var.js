/*global define, console */
define(function() {
    "use strict";
    var action = (function () {
            var body = document.body;
            body.innerHTML = "<p>Hot damn!</p>";
            console.log("I did an action");
        }());
    }
);