define(
    [
        "app/core",

        "lodash",
        "jquery"
    ],
    function (core, _, $) {
        "use strict";

        core.register("hash", function (sandbox) {
            var state = {};
            var previousState = {};
            var titles = {
                "home": "Home",
            }; // UISTRING

            var defaultSection = "cluster";

            var hashChangeFunction = function () {
                var newState = $.bbq.getState();

                // Additional state processing. When URL looks like this
                // http://localhost/hedvig/dev/#/vdisk      or this
                // http://localhost/hedvig/dev/#/node&node=acf767db-5430-4f52-8aa5-7272200f865b&location=dna2&type=data
                // then it means that section should be vdisk or node, respectively.
                // State variable in this case will have a key starting with a slash. It should be replaced to a section
                AppUtility.styleAppState(newState);

                if (!newState.section) {
                    var session = SessionUtility.getSession();
                    newState.section = session ? defaultSection : "login";
                }

                if (newState.section == "registration") { // end session
                    sandbox.notify({
                        type: "session-status",
                        data: { "status": "end" }
                    });
                }

                if (newState.debug) {
                    sandbox.notify({
                        type: "show-debug-window"
                    });
                }

                AppUtility.Settings.set("previous-state", state);

                if (state.section != newState.section) {
                    state = _(newState).clone();

                    var title = "Hedvig"; // UISTRING
                    if (state.section) {
                        title = (titles[state.section] || "No such page") + " | Hedvig"; // UISTRING
                    }
                    document.title = title;

                    sandbox.notify({
                        type: "navigation",
                        data: { destination: state.section }
                    });
                } else {
                    state = _(newState).clone();

                    sandbox.notify({
                        type: "refresh-section",
                        data: state
                    });
                }

                sandbox.notify({
                    type: "state-change",
                    data: newState
                });

                // check if logged in
                if (SessionUtility.getSession() == null && (newState.section != "login" && newState.section != "registration")) {
                    window.location.href = AppUtility.getStateLink({section: "login"});
                }
            };

            return {
                sandbox: sandbox,

                init: function () {
                    sandbox.listen([
                        "request-state-change",
                        "request-state-append"
                    ], this);
                    $(window).on("hashchange", hashChangeFunction);

                    hashChangeFunction();
                },

                destroy: function () {
                    $(window).off("hashchange", hashChangeFunction);
                },

                handleNotification: function (payload) {
                    switch (payload.type) {
                        case "request-state-change":
                            // This used instead of BBQ ensures using smart rules like omitting session=
                            window.location.href = AppUtility.getStateLink(payload.data);
                            // $.bbq.pushState(payload.data, 2);
                            break;
                        case "request-state-append":
                            // TODO use AppUtility
                            $.bbq.pushState(payload.data, 0);
                            break;
                    }
                }
            }
        });
    }
);