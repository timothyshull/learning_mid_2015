/*global define */
define(function () {
    "use strict";
    var storage = [],
        cartName = "badass cart";
    return {
        name: cartName,
        add: function addToStorage (obj) {
            storage.push(obj);
        },
        get: function getStorage () {
            return storage;
        }
    };
});