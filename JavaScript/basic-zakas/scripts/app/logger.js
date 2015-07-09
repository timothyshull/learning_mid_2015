define(
    [],
    function() {
        "use strict";

        var global = (typeof window === 'undefined' ? this : window);
        var consoleReference = global.console || {};

        function consoleSupported() {
            return (consoleReference !== undefined && console.log && console.warn && console.error) ? true : false;
        }

        function noConsole() {
            return null;
        }

        if (consoleSupported()) {
            return {
                debug: function() {
                    return consoleReference.log.apply(consoleReference, arguments);
                },

                warn: function() {
                    return consoleReference.warn.apply(consoleReference, arguments);
                },

                error: function() {
                    return consoleReference.error.apply(consoleReference, arguments);
                },

                productionError: function() {
                    return consoleReference.error.apply(consoleReference, arguments);
                }
            };
        }

        return {
            debug: noConsole(),
            warn: noConsole(),
            error: noConsole(),
            productionError: noConsole()
        };
    }
);