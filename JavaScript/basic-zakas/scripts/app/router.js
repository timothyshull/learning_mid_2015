define(
    [
        "app/core",
        "utility/session-utility",
        "utility/app-utility",

        "underscore",
        "jquery",

        "historyjs"
    ],
    function (core, SessionUtility, AppUtility, _, $, History) {
        "use strict";
        core.register("router", function (sandbox) {
            var state = {};
            var previousState = {};
            var titles = {
                "home": "Welcome | Basic Zakas"
            };

            var defaultSection = "home";

            var hashChangeFunction = function () {
                var newState = History.getState();
            };

            return {
                sandbox: sandbox,

                init: function () {
                    sandbox.listen([
                        "request-state-change",
                        "request-state-append"
                    ], this);

                    History.Adapter.bind(window,'statechange', hashChangeFunction);
                    hashChangeFunction();
                },

                destroy: function () {
                    $(window).off("hashchange", hashChangeFunction);
                },

                handleNotification: function (payload) {
                    switch (payload.type) {
                    case "request-state-change":
                        History.pushState(payload.data);
                        break;
                    case "request-state-append":
                        History.pushState(payload.data, 0);
                        break;
                    }
                }
            }
        });
    }
);