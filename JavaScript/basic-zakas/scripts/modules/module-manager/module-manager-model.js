"use strict";
define(
    [
        "app/core",
        "utility/app-utility",
        "modules/base/base-model",
        "app/logger",

        "underscore",

        "modules/module-manager/module-manager-controller"
    ],
    function(core, AppUtility, BaseModel, log, _) {
        core.registerModel("module-manager", function() {
            var modules = {};
            var debugShown = false;

            var changeModuleStatus = function(moduleId, running, model) {
                if (!_.has(modules, moduleId)) {
                    log.error(AppUtility.getUIString("module.manager.model.notification", (running ? "startup" : "shutdown"), moduleId)); // UISTRING
                } else {
                    modules[moduleId].running = running;
                    model.notifyUpdate("module-status");
                }
            };

            var getModule = function(moduleId) {
                return modules[moduleId];
            };

            return BaseModel.extend({
                getModules: function() {
                    return modules
                },

                initWithModules: function(data) {
                    modules = data;
                    this.notifyUpdate("module-status");
                },

                moduleRegistered: function(moduleId) {
                    modules[moduleId] = { running: false };
                    this.notifyUpdate("module-status");
                },

                moduleStarted: function(moduleId) {
                    changeModuleStatus(moduleId, true, this);
                },

                moduleStopped: function(moduleId) {
                    changeModuleStatus(moduleId, false, this);
                },

                isModuleRegistered: function(moduleId) {
                    return getModule(moduleId) != null;
                },

                showDebug: function() {
                    debugShown = true;
                    this.notifyViews({
                        type: "debug-visibility",
                        data: debugShown
                    });
                },

                hideDebug: function() {
                    debugShown = false;
                    this.notifyViews({
                        type: "debug-visibility",
                        data: debugShown
                    });
                },

                isShown: function() {
                    return debugShown
                },

                isModuleActive: function(moduleId) {
                    var targetModule = getModule(moduleId);
                    if (!targetModule) {
                        throw AppUtility.getUIString("module.manager.activity.error", moduleId); // UISTRING
                    }
                    return targetModule.running;
                }
            })
        });
    }
);