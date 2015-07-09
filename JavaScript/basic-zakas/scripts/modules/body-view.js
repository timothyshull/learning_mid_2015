/*global define*/
/*jslint nomen: true*/
define(
    [
        "app/core",
        "lib/text!views/body.html",
        "jquery"
        //"underscore"
    ],
    function (core, markup, $) {
        "use strict";
        core.registerView("body", "main", function () {
            var model, controller, element,

                populateElement = function () {
                    $(element).addClass("body");
                    $(element).html(markup);
                };

            return {
                init: function (modelToUse, controllerToUse, elementToUse) {
                    model = modelToUse;
                    controller = controllerToUse;
                    element = elementToUse;

                    if (this.model instanceof Object) {
                        this.model.connectView(this);
                    }

                    populateElement();
                },

                destroy: function () {
                    $(element).removeClass("body");
                    $(element).empty();
                },

                notify: function (payload) {
                    return;
                }
            };
        });
    }
);
