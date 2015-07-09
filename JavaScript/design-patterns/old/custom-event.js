/*global define, window, setTimeout, Event, document, console*/
define(function () {
    "use strict";
    var event = new Event("testEvent"),
        elem = document.getElementById("custom-event");

    elem.addEventListener("testEvent", function () {
        console.log("Proxied event");
    }, false);

    elem.addEventListener("click", function () {
        elem.dispatchEvent(event);
    }, false);
});