define(["lodash"],
    function (_) {
        "use strict";

        return function Sandbox(moduleReference, moduleId, model, coreReference) {
            // Event types which the module receives from the other modules (routed through application core)
            var listenedTypes,
            // The object that contains handleNotification function to process events
                messageHandlerObject;

            return {
                model: model,

                // Called to notify other modules of the event from this module
                notify: function notifyAllModules(payload) {
                    coreReference.notify(payload, moduleReference);
                },

                // Dispatch the event from the other modules to the module controlled by the sandbox
                dispatch: function dispatchEventToModules(payload) {
                    // Check if the module listens for this type of event
                    if (_(listenedTypes).isArray()) {
                        listenedTypes.forEach(function handleNotificationOfType(type) {
                            if (type === payload.type) {
                                // if yes, handle the notification of this module
                                if (messageHandlerObject) {
                                    messageHandlerObject.handleNotification(payload);
                                }
                            }
                        });
                    }
                },

                // Tells the sandbox that this module wants to listen to certain event types and process it with
                // the handlerObject
                listen: function listenToModuleMessages(types, handlerObject) {
                    listenedTypes = types;
                    messageHandlerObject = handlerObject;
                },

                // Returns true if the module has a certain view
                hasView: function moduleHasView(viewId) {
                    return coreReference.hasView(moduleId, viewId);
                },

                // Injects the view to the specified DOM element
                injectView: function injectView(viewId, element) {
                    return coreReference.injectView(moduleId, viewId, element);
                },

                // Removes the specified view
                removeView: function removeView(view) {
                    return coreReference.removeView(moduleId, view);
                }
            };
        };
    }
);