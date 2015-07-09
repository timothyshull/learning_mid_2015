/*global define*/
define(function () {
    "use strict";
    /**
     * All three are essentially equivalent
     */
    var newObject1 = {},
        newObject2 = Object.create(Object.prototype),
        newObject3 = new Object(); //JSLint prefers 1 or 2
    return {
        prop1: newObject1,
        prop2: newObject2,
        prop3: newObject3
    };
});