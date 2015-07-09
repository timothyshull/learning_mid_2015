/*global define */
define(function () {
    "use strict";
    var count = 100,
        store = "Hippy Tie Dyed Warehouse";
    return {
        storeName: store,
        decrement: function decrementCount () {
            count = count - 1;
        },
        get: function getCount () {
            return count;
        }
    };
});