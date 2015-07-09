define(
    [
        "app/core",
        "underscore"
    ],
    function(core, _) {
        "use strict";

        core.register("body", function (sandbox) {
            function refreshViews() {
                sandbox.model.update();
            }

            var processViewChange = function (viewToSet) {
                sandbox.model.viewModel.setCurrentView(viewToSet);
            };


            return {
                sandbox: sandbox,

                init: function () {
                    sandbox.listen(_(actionTypeMap).values().map(function (d) { return d + "-result" }).concat([
                        "state-change"
                    ]), this);

                    sandbox.model.setStatus("progress", AppUtility.getUIString("cluster.loading.cluster")); // UISTRING

                    requestUpdate();
                },

                destroy: function () {

                },

                injectView: function (viewId, element) {
                    return sandbox.injectView(viewId, element);
                },

                removeView: function (view) {
                    sandbox.removeView(view);
                },

                setCurrentView: function (view) {
                    return processViewChange(view);
                },

                // hack
                setCurrentViewWithHashChange: function (view) {
                    window.location.href = AppUtility.getStateLink({ section: "body", view: view });
                },

                getCurrentView: function (view) {
                    return sandbox.model.viewModel.getCurrentView();
                },

                handleNotification: function (payload) {

                    switch (payload.type) {
                    case "state-change":
                        if (payload.data.section == "main") {
                            var defaultView = "main";
                            this.setCurrentView(payload.data.view || defaultView);
                        }
                        break;
                    }
                }
            };
        });
    }
);