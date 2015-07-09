define(
    [
        "app/core",
        "utility/ControlsUtility",
        "jquery",
        "lodash",
        "lib/text!widgets/home.html"
    ],
    function(core, ControlsUtility, $, _, markup) {
        "use strict";
        core.registerView("module1", "main", function () {
            var model,
                controller,
                element;

            function populateElement() {
                $(element).html(markup);
            }

            return {
                init: function (modelToUse, controllerToUse, elementToUse) {
                    model = modelToUse;
                    controller = controllerToUse;
                    element = elementToUse;

                    // on model update the view should update itself
                    if (model) {
                        model.connectView(this);
                    }
                    populateElement();
                },

                destroy: function () {
                    $(element).empty();
                },

                notify: function (payload) {

                    switch (payload.type) {
                        case "logs-shown-changed":
                            changeLogsShown(payload.data);
                            break;
                    }
                }
            };
        });
    }
);