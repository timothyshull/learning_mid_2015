/*global define */
define(
    function(require) {
        var a = require('a'),
            b = require('b'),
            myShirts;

        return function () {
            myShirts = {
                shirt1: a,
                shirt2: b
            };
            return myShirts;
        };
    }
);