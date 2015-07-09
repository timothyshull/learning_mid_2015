define(
    ["underscore"],
    function(_) {
        "use strict";

        return {
            basicInit: function(sandbox) {
                this.sandbox = sandbox;
            },

            injectView: function(viewId, element) {
                return this.sandbox.injectView(viewId, element);
            }
        };
    }
);
