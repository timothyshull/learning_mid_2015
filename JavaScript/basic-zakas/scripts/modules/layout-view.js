define(
    [
        // "utility/ControlsUtility",
        "underscore"
    ],
    function(_) {
        "use strict";

        return {
            moduleStatusUpdated: function(data) {
                var itemsRefresh = _(this.itemsRefresh).isFunction() ? this.itemsRefresh(data) : this.itemsRefresh;
                // ControlsUtility.statusUpdated(data, this.element, itemsRefresh);
            },

            basicInit: function(modelToUse, controllerToUse, elementToUse) {
                var newHandlers = {},
                    newActions = {};

                this.model = modelToUse;
                this.controller = controllerToUse;
                this.element = elementToUse;
                this.$element = $(elementToUse);

                // on model update the view should update itself
                if (this.model instanceof Object) {
                    this.model.connectView(this);
                }

                // Rebind all handlers and actions
                _(this.handlers).map(function(func, key) {
                    newHandlers[key] = _(func).isFunction() ? func.bind(this) : func;
                }.bind(this));

                _(this.actions).map(function(func, key) {
                    newActions[key] = _(func).isFunction() ? func.bind(this) : func;
                }.bind(this));

                this.handlers = newHandlers;
                this.actions = newActions;

                this.actions.populateElement();
            }
        };
    }
);
