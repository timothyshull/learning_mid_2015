/*global define */
define(["./old/cart", "./old/inventory"],
    function(cart, inventory) {
        "use strict";
        //return a function to define "foo/title".
        //It gets or sets the window title.
        return function(title) {
            return title ? (window.title = title) :
            inventory.storeName + ' ' + cart.name;
        };
    }
);