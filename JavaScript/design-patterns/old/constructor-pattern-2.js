/*global define */
define(
    function () {
        "use strict";
        var newObject = {};
        //ES3
        newObject.prop1 = "This is property 1";
        newObject["prop2"] = "This is property 2";//JSLint doesn't like bracket property access
        //ES5
        Object.defineProperty(newObject, "prop3", function () {
            return this.prop2;
        });

        Object.defineProperties(newObject, {
            "prop4": {
                prop4sub1: "This is prop4sub1",
                prop4sub2: function () {
                    return "This is prop4sub2";
                }
            },

            "prop5": function () {
                return undefined;
            }
        });

        return newObject;
    }
);