"use strict";
define(
    [
        "app/core",

        "underscore",
        "jquery",

        "modules/module-manager/module-manager-controller",
        "modules/module-manager/module-manager-model"
    ],
    function(core, _, $) {
        core.registerView("module-manager", "main", function() {
            var model;
            var controller;
            var element;
            var controlPanel;


            var populateElement = function() {
                $(element).addClass("module-manager");
                $(element).append($("<span/>").text("Module management"));

                controlPanel = $("<div/>").addClass("control-panel");

                $(element).append(controlPanel);
            }


            return {
                init: function(modelToUse, controllerToUse, elementToUse) {
                    model = modelToUse;
                    controller = controllerToUse;
                    element = elementToUse;

                    // on model update the view should update itself
                    model && model.connectView(this);
                    populateElement();
                },

                destroy: function() {
                    $(element).removeClass("module-manager");
                    $(element).empty();
                },

                notify: function(payload) {
                    controlPanel.empty();

                    _.each(model.getModules(), function(data, moduleId) {
                        var controlButton = $("<input/>").attr("type", "button").addClass("control-button").addClass(data.running ? "running" : "stopped");
                        controlButton.attr("value", moduleId);
                        controlButton.on("click", function() {
                            //var start = !data.running;

                            // Forward to controller
                            controller.moduleAction(moduleId);
                        });
                        controlPanel.append(controlButton);
                    });
                }
            }
        });
    }
);