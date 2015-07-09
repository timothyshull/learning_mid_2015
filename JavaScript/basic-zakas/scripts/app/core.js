/*global define*/
/*jslint nomen: true, todo: true*/
define(
    [
        "app/sandbox",
        "app/logger",
        "underscore"
    ],
    function (Sandbox, log, _) {
        "use strict";
        var coreReference,
            Core;

        Core = function () {

            var moduleData = {},
                preloadedData = {},
                debug = true;

            function forEachModule(action, thisObject) {
                var moduleId;
                for (moduleId in moduleData) {
                    if (moduleData.hasOwnProperty(moduleId)) {
                        action.call(thisObject, moduleData[moduleId].instance);
                    }
                }
            }

            return {

                register: function (moduleId, creator) {
                    var moduleProperties = {
                            Creator: creator,
                            viewData: [],
                            modelCreator: null,
                            model: null,
                            instance: null
                        },
                        preloaded = preloadedData[moduleId];

                    if (preloaded) {
                        if (preloaded.modelCreator) {
                            moduleProperties.modelCreator = preloaded.modelCreator;
                        }
                        if (preloaded.viewData) {
                            moduleProperties.viewData = _(preloaded.viewData).clone();
                        }
                        delete preloadedData[moduleId];
                    }

                    moduleData[moduleId] = moduleProperties;

                    this.notify({
                        type: "module-registered",
                        data: moduleId
                    });
                },

                createInstance: function (moduleId) {
                    var sandbox = new Sandbox(this, moduleId, moduleData[moduleId].model, coreReference),
                        creator = moduleData[moduleId].Creator,
                        instance;

                    instance = Object.create(creator(sandbox));

                    if (!debug) {
                        _.each(instance)(function (method, name) {
                            if (typeof method === "function") {
                                instance[name] = (function (name, method) {
                                    return function () {
                                        try {
                                            return method.apply(instance, arguments);
                                        } catch (e) {
                                            log.productionError("Error in module " + moduleId + " " + name + " : " + e.message);
                                            return null;
                                        }
                                    };
                                }(name, method));
                            }
                        });
                    }

                    return instance;
                },

                start: function (moduleId, startupId) {
                    var data = moduleData[moduleId];

                    if (startupId) {
                        this.register(startupId, data.Creator);
                        this.registerModel(startupId, data.modelCreator);
                        data.viewData.forEach(function (view) {
                            this.registerView(startupId, view.viewId, view.Creator);
                        }.bind(this));

                        moduleId = startupId;
                        data = moduleData[startupId];
                    }


                    if (data.modelCreator) {
                        data.model = new data.modelCreator();

                        if (_(data.model.init).isFunction()) {
                            data.model.init();
                        }
                    }

                    data.instance = this.createInstance(moduleId);

                    data.instance.init(moduleId);

                    this.createViews(moduleId);

                    this.notify({
                        type: "module-started",
                        data: moduleId
                    });

                    return data.instance;
                },

                stop: function (moduleId) {
                    try {
                        var data = moduleData[moduleId];
                        if (data.instance) {

                            _.each(data.instance.views, function (view) {
                                view.destroy();
                            });
                            data.instance.views = [];

                            data.instance.destroy();
                            data.instance = null;
                            data.model = null;
                        }

                        this.notify({
                            type: "module-stopped",
                            data: moduleId
                        });
                    } catch (e) {
                        log.error("Error stopping the module " + moduleId);
                        this.notify({
                            type: "module-stop-error",
                            data: moduleId
                        });
                        throw e;
                    }
                },

                getRegisteredModules: function () {
                    return _(moduleData).keys();
                },

                isModuleActive: function (moduleId) {
                    // TODO instance of Module?
                    return _(moduleData).has(moduleId) && moduleData[moduleId].instance instanceof Object;
                },

                registerModel: function (moduleId, modelCreator) {
                    if (_.has(moduleData, moduleId)) {
                        moduleData[moduleId].modelCreator = modelCreator;
                    } else {
                        if (!_.has(preloadedData, moduleId)) {
                            preloadedData[moduleId] = {};
                        }
                        preloadedData[moduleId].modelCreator = modelCreator;
                    }
                },

                registerView: function (moduleId, viewId, creator) {
                    if (_.has(moduleData, moduleId)) {
                        moduleData[moduleId].viewData.push({ Creator: creator, viewId: viewId });
                    } else {
                        if (!_.has(preloadedData, moduleId)) {
                            preloadedData[moduleId] = {};
                        }
                        if (!preloadedData[moduleId].viewData) {
                            preloadedData[moduleId].viewData = [];
                        }
                        preloadedData[moduleId].viewData.push({ Creator: creator, viewId: viewId });
                    }
                },

                configureView: function (moduleId, viewId, elementRetriever, initializationPriority) {
                    if (_.has(moduleData, moduleId)) {
                        var view = _.find(moduleData[moduleId].viewData, function (data) {
                            return data.viewId === viewId;
                        });
                        if (view) {
                            view.element = elementRetriever;
                            if (initializationPriority) {
                                view.initializationPriority = initializationPriority;
                            }
                        } else {
                            log.error("Can't configure view " + viewId + " for module " + moduleId + " : view not found");
                        }
                    } else {
                        log.error("Can't configure view " + viewId + " : module " + moduleId + " not found");
                    }
                },

                createViews: function (moduleId) {
                    var targetModuleData = moduleData[moduleId];
                    targetModuleData.instance.views = [];

                    function idComparator(idComparableA, idComparableB) {
                        var idA = idComparableA.viewId.toLowerCase(),
                            idB = idComparableB.viewId.toLowerCase();

                        if (idA > idB) {
                            return 1;
                        }
                        if (idA < idB) {
                            return -1;
                        }
                        return 0;
                    }

                    function priorityComparator(prioritizedA, prioritizedB) {
                        var priorityA = prioritizedA.initializationPriority || 0,
                            priorityB = prioritizedB.initializationPriority || 0;

                        if (priorityA > priorityB) {
                            return 1;
                        }
                        if (priorityA < priorityB) {
                            return -1;
                        }

                        return idComparator(prioritizedA, prioritizedB);
                    }

                    targetModuleData.viewData.sort(priorityComparator);

                    _.each(targetModuleData.viewData, function (viewDataEntry) {
                        var element = viewDataEntry.element,
                            view;

                        if (typeof element === "function") {
                            element = element();
                        }

                        if (element) {
                            view = new viewDataEntry.Creator();
                            view.viewId = viewDataEntry.viewId;
                            targetModuleData.instance.views.push(view);
                            element.setAttribute("data-module-id", moduleId);
                            view.init(targetModuleData.model, targetModuleData.instance, element);
                        }
                    });
                },

                injectView: function (moduleId, viewId, element) {
                    var targetModuleData = moduleData[moduleId],
                        viewData = _.find(targetModuleData.viewData, function (viewData) {
                            return viewData.viewId === viewId;
                        }),
                        view = viewData.Creator();

                    view.viewId = viewData.viewId;

                    if (!targetModuleData.instance.views) {
                        targetModuleData.instance.views = [];
                    }

                    targetModuleData.instance.views.push(view);
                    element.setAttribute("data-module-id", moduleId);
                    view.init(targetModuleData.model, targetModuleData.instance, element);

                    return view;
                },

                hasView: function (moduleId, view) {
                    var targetModuleData = moduleData[moduleId];

                    view = _(targetModuleData.instance.views).findWhere({ viewId: view });

                    return view instanceof Object;
                },

                removeView: function (moduleId, view) {
                    var targetModuleData = moduleData[moduleId],
                        viewIndex;

                    if (typeof view === "string") {
                        view = _(targetModuleData.instance.views).findWhere({ viewId: view });
                    }
                    viewIndex = targetModuleData.instance.views.indexOf(view);

                    if (viewIndex >= 0) {
                        targetModuleData.instance.views.splice(viewIndex, 1);
                    }

                    if (view instanceof Object) {
                        if (view.element) {
                            view.element.removeAttribute("data-module-id");
                        }
                        view.destroy();
                    } else {
                        log.error("Can't destroy the view " + view + " of " + moduleId + " as it is not a valid view object");
                    }
                },

                notify: function (payload, sourceModule) {
                    var activeFunction,
                        modulesInfo,
                        moduleId;

                    switch (payload.type) {
                    case "module-toggle-state":
                        moduleId = payload.data;
                        if (!this.isModuleActive(moduleId)) {
                            this.start(moduleId);
                        } else {
                            this.stop(moduleId);
                        }
                        break;
                    case "get-module-information":
                        activeFunction = this.isModuleActive;
                        modulesInfo = this.getRegisteredModules().map(function (moduleId) {
                            return { name: moduleId, running: activeFunction(moduleId) };
                        });
                        this.notify({
                            type: "module-information",
                            data: modulesInfo
                        });
                        break;
                    }

                    forEachModule(function dispatchToModule(instance) {
                        if (instance instanceof Object && sourceModule !== instance) {
                            instance.sandbox.dispatch(payload);
                        }
                    }, this);
                }
            };
        };

        coreReference = new Core();
        return coreReference;
    }
);