/**
 * Created by skull on 5/21/15.
 * Useful when:
 * There must be exactly one instance of a class, and it must be accessible to clients from a well-known access point.
 * When the sole instance should be extensible by subclassing, and clients should be able to use an extended instance
 * without modifying their code.
 * In practice, the Singleton pattern is useful when exactly one object is needed to coordinate others across a system
 */
/*global define, console */
define(function () {
    "use strict";
    var instance;

    function init() {
        function privateMethod() {
            console.log("Private method");
        }

        var privateVar = "Private var";

        return {
            publicMethod: function () {
                console.log("Public method");
            },
            publicProp: "Public property"
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }

            return instance;
        }
    };
});