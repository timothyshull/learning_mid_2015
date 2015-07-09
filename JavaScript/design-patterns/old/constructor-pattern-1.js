/*global define */
define(
    [
        "constructor1"
    ],
    function (Constructor1) {
        "use strict";
        var newObject1 = new Constructor1(),
            newObject2 = Object.create(Constructor1.prototype);

        return {
            prop1: newObject1,
            prop2: newObject2
        };
    }
);