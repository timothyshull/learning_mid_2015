/*global define, console */
define(
    [
        "app/core"
    ],
    function (Core) {
        "use strict";
        Core.register("module1", function (sandbox) {
            return {
                sandbox: sandbox,
                init: function () {
                    // constructor

                    //not sure if I'm allowed...
                    if (sandbox) {
                        console.log("sandbox has method");
                    }
                },
                destroy: function () {
                    //destructor
                }
            };
        });
    }
);