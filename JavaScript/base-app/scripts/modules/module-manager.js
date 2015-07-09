define(
    [
        "app/core",
        "lodash"
    ],
    function (core, _) {
        "use strict";
        core.register("module-manager", function (sandbox) {
            var managedModules = [ "module1" ],
                destinationModules = {
                    "module1": [ "module1" ]
                };

            (function extendWithDebug() {
                if (AppUtility.isDebug()) {
                    managedModules.push("server-mgt");
                    destinationModules["server-management"] = [ "server-mgt", "header", "alerts" ];
                }
            }());

            var moduleInformationSuccessHandler = function (result) {
                var data = {};
                result.forEach(function (moduleData) {
                    data[moduleData.name] = { running: moduleData.running };
                });
                sandbox.model.initWithModules(data);
            };

            var gotoDestination = function (destination) {
                var modules = destinationModules[destination];
                _.each(managedModules, function (moduleId) {
                    var moduleShouldBeActive = _.contains(modules, moduleId);
                    var moduleActive = sandbox.model.isModuleActive(moduleId);

                    if (moduleShouldBeActive != moduleActive) {
                        sandbox.notify({
                            type: "module-toggle-state",
                            data: moduleId
                        });
                    }
                });
            };

            return {
                sandbox: sandbox,

                init: function () {
                    sandbox.listen([
                        "module-registered",
                        "module-started",
                        "module-stopped",
                        "module-startup-error",
                        "module-stop-error",
                        "module-information",
                        "navigation",
                        "connection-status",
                        "request-register-result",
                        "request-log-in-result",
                        "request-log-out-result",
                        "profile-saved",
                        "theme-change",
                        "show-debug-window"
                    ], this);

                    sandbox.notify({ type: "get-module-information" });
                },

                destroy: function () {

                },

                moduleAction: function (moduleId) {
                    sandbox.notify({
                        type: "module-toggle-state",
                        data: moduleId
                    });
                },

                handleNotification: function (payload) {
                    switch (payload.type) {
                        case "navigation":
                            var destination = payload.data.destination;
                            gotoDestination(destination);
                            break;
                        case "module-registered":
                            sandbox.model.moduleRegistered(payload.data);
                            break;
                        case "module-started":
                            sandbox.model.moduleStarted(payload.data);
                            break;
                        case "module-stopped":
                            sandbox.model.moduleStopped(payload.data);
                            break;
                        case "module-startup-error":
                            break;
                        case "module-stop-error":
                            break;
                        case "module-information":
                            moduleInformationSuccessHandler(payload.data);
                            break;
                        case "request-log-out-result":
                            // TODO need an elegant way
                            if (payload.data) {
                                sandbox.notify({
                                    type: "session-status",
                                    data: { "status": "end" }
                                });

                                window.location.href = AppUtility.getStateLink({"section": "login"});
                            }
                            break;
                        case "request-log-in-result":
                        case "request-register-result":
                            if (payload.data.status == AppUtility.Constants.Statuses.Success) {
                                var sessionData = {
                                    sessionId: payload.data.sessionId,
                                    displayName: payload.data.displayName,
                                    username: payload.data.username,
                                    cluster: payload.data.cluster,
                                    clusterLocation: payload.data.clusterLocation,
                                    version: payload.data.version || AppUtility.getVersion(),
                                    permissions: payload.data.permissions
                                };
                                sandbox.notify({
                                    type: "session-status",
                                    data: _(sessionData).extend({ "status": "start" })
                                });

                                // TODO: better approach for going to cluster view
                                if (payload.data.firstTimeUser == true) {
                                    sandbox.notify({
                                        type: "request-state-change",
                                        data: { "section": "edit-profile" }
                                    });
                                } else {
                                    sandbox.notify({
                                        type: "request-state-change",
                                        data: { "section": "cluster" }
                                    });
                                }
                            }
                            break;
                        case "profile-saved":
                            var previousState = AppUtility.Settings.get("previous-state");

                            var newState = previousState;
                            if (!newState || !newState.section || newState.section == "registration" || newState.section == "login" || newState.section == "edit-profile") {
                                newState = { "section": "cluster" };
                            }
                            sandbox.notify({
                                type: "request-state-change",
                                data: newState
                            });
                            return;
                        case "connection-status":
                            if (payload.data === "open") {

                            }
                            return;
                        case "theme-change":
                            ThemeUtility.changeTheme(payload.data);
                            break;
                        case "show-debug-window":
                            if (AppUtility.isDebug()) {
                                sandbox.model.showDebug();
                            }
                            break;
                    }
                }
            }
        });
    }
);