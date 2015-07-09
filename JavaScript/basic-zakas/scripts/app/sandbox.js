define(
    ["underscore"],
    function(_) {
        "use strict";

        return function Sandbox(moduleReference, moduleId, model, coreReference) {
            var listenedTypes,
                messageHandlerObject;

            return {
                model: model,

                moduleId: moduleId,

                notify: function notifyAllModules(payload /*, bindResponseToModule*/ ) {
                    coreReference.notify(payload, moduleReference);
                },

                dispatch: function dispatchEventToModules(payload) {
                    if (messageHandlerObject instanceof Object && _(listenedTypes).contains(payload.type)) {
                        messageHandlerObject.handleNotification(payload);
                    }
                },

                listen: function listenToModuleMessages(types, handlerObject) {
                    listenedTypes = types;
                    messageHandlerObject = handlerObject;
                },

                hasView: function moduleHasView(viewId) {
                    return coreReference.hasView(moduleId, viewId);
                },

                injectView: function injectView(viewId, element) {
                    return coreReference.injectView(moduleId, viewId, element);
                },

                removeView: function removeView(view) {
                    return coreReference.removeView(moduleId, view);
                }
            };
        };
    }
);
