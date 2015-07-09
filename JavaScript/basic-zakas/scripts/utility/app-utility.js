/*global define, window, WebSocket */
/*jslint nomen: true */
define(
    [
        "utility/Toolbox",
        "app/logger",
        "underscore",
        "jquery",
        "lib/modernizr",

        "historyjs"
    ],
    function (Toolbox, log, _, $, Modernizr, sprintf) {
        "use strict";

        var emptyFunction,
            // These are debug hosts. If the host starts with one of the following strings, debug options are enabled
            debugHosts = [ "localhost", "127.0.0.1", "demo.glazunov.eu", "rasp.glazunov.eu", "hedvig.glazunov.eu", "134.102.81.", "ian.glazunov.eu" ],
            flexibleConnectionHosts = [ "localhost", "127.0.0.1" ],
            // don't remove the comment from the next line. it's used by Grunt automate to populate version from
            // package.json file
            /* declare version */version = "0.99",
            beautifyHashState = false,
            performanceTrack = {},
            performanceReference = window.performance,
            performanceSupported = performanceReference instanceof Object && typeof performanceReference.now === "function",
            Performance;


        Performance = {
            trackStart: function (key) {
                if (_(performanceTrack).has(key)) {
                    log.warn("Tracking already running for", key, ". Restarting.");
                }

                performanceTrack[key] = performanceReference.now();
            },

            trackEnd: function (key) {
                var result;

                if (_(performanceTrack).has(key)) {
                    result = performanceReference.now() - performanceTrack[key];
                    delete performanceTrack[key];
                    return result;
                }

                // log.warn("Tracking wasn't started for", key);

                return null;
            },

            isSupported: function () {
                return performanceSupported;
            }
        };

        if (!performanceSupported) {
            emptyFunction = function () { return null; };

            Performance.trackStart = emptyFunction;
            Performance.trackEnd = emptyFunction;
        }


        return {
            /**
             * String representation of current application version
             * @returns {String} example: 1.2b
             */
            getVersion: function getApplicationVersion() {
                return "v " + version;
            },
            /**
             * Comparator for different application versions
             * @param {Object} [version] operand 1 for comparison, version object
             * @param {Object} [anotherVersion] operand 2 for comparison, version object
             * @returns {number} result of comparison, positive, 0 or negative
             */
            compareVersions: function compareApplicationVersions(version, anotherVersion) {
                function versionValue(version) {
                    // assuming the syntax of "X.YZ"
                    return parseInt(version, 10);
                }

                return versionValue(version) - versionValue(anotherVersion);
            },


            // Used throughout app
            Constants: {
                EntityTypes: {
                    HPod: "hPod",
                    EdgeNode: "edge",
                    DataNode: "data",
                    PageNode: "page",
                    SplitNode: "split"
                },

                DiskTypes: {
                    Block: "block",
                    Nfs: "nfs"
                },

                ControllerProtocols: {
                    Block: "block",
                    Nfs: "nfs"
                },

                Statuses: {
                    Success: "success",
                    Failure: "failure",
                    Warning: "warning",
                    Progress: "progress"
                },

                ActivityTemperatures: {
                    Hot: "hot",
                    Warm: "warm",
                    Cool: "cool"
                },

                NodeStatuses: {
                    Up: "up",
                    Down: "down"
                },

                ActivityTypes: {
                    Spm: "spm",
                    Rereplication: "rereplication"
                },

                DataSources: {
                    CurrentUser: "user",
                    Cluster: "cluster"
                }
            },

            // Additional state processing. When URL looks like this
            // http://localhost/hedvig/dev/#/vdisk      or this
            // http://localhost/hedvig/dev/#/node&node=acf767db-5430-4f52-8aa5-7272200f865b&location=dna2&type=data
            // then it means that section should be vdisk or node, respectively.
            // State variable in this case will have a key starting with a slash. It should be replaced to a section
            styleAppState: function (newState) {
                /*jslint unparam: true*/
                if (beautifyHashState) {
                    _(newState).map(function (value, key) {
                        if (key.indexOf("/") === 0) {
                            delete newState[key];
                            newState.section = key.substring(1);
                        }
                    });
                }
            },

            /**
             * The application state is something that's accessible by URL (hash part of it sets the state). This
             * function returns a relative URL (more precisely, hash) for a certain state
             * @param state -
             * @returns {string}
             */
            getStateLink: function getApplicationStateLink(state) {
                var result = "",
                    compactState,
                    stateEmpty = true,
                    section;

                if (state instanceof Object) {
                    compactState = {};

                    // Compact the state by removing empty values
                    _(state).forEach(function (stateValue, stateKey) {
                        result = (typeof stateValue === "string") && (stateValue !== "");
                        if (result) {
                            stateEmpty = false;
                        }
                        compactState[stateKey] = stateValue;
                    });


                    if (beautifyHashState) {
                        section = compactState.section;
                        delete compactState.section;

                        if (!stateEmpty) {
                            if (typeof section === "string") {
                                result = "#/" + section + (_(compactState).isEmpty() ? "" : ("&" + $.param(compactState)));
                            } else {
                                result = "#" + $.param(compactState);
                            }
                        }
                    } else {
                        result = "#" + $.param(compactState);
                    }
                }

                return result;
            },


            /**
             * Get display message for a status reported by a module. Used to universally form messages for all module
             * statuses. Show status with first letter uppercase followed by colon and explanatory message.
             *
             * @param {String} [status] success, failure, warning, progress
             * @param {String} [message] verbal explanation of status
             * @returns {string} resulting message ready for display
             */
            getStatusDisplayMessage: function getModuleStatusDisplayMessage(status, message) {
                var displayMessage = "";

                if (status !== "progress") {
                    displayMessage += Toolbox.upcaseFirst(status || this.getUIString("status.not.reported"));

                    if (message) {
                        displayMessage += ": ";
                    }
                }

                if (message) {
                    displayMessage += message;
                }

                // Don't display success message at all
                if (status === "success") {
                    displayMessage = "";
                }

                return displayMessage;
            },


            /**
             * Detects if the application is running on mobile to take advantage of mobile interface.
             * The detection isn't bullet proof at all as it's just takes screen size and touch capabilities into
             * account. But still, if the device features touch and browser window is rather small, it would be better
             * off with mobile UI.
             *
             * @returns {Boolean} if is running on mobile
             */
            isMobile: function shouldUseMobileInterface() {
                return Modernizr.touch && $(window).width() <= 768;
            },

            isTouchDevice: function deviceSupportsTouch() {
                return Modernizr.touch;
            },

            /**
             * Figure out if the application should offer test/debug functionality. It should if running on certain
             * hosts, such as localhost.
             *
             * @returns {Boolean} true if the application should offer test/debug functionality.
             */
            isDebug: function isDebug() {
                var host = window.location.host;

                function hostMathes(hostPartToCheck) {
                    var hostIndex = host.indexOf(hostPartToCheck);
                    return hostIndex === 0;
                }

                return _.any(debugHosts, hostMathes);
            },

            connectionFlexible: function connectionFlexible() {
                var host = window.location.host;

                function hostMathes(hostPartToCheck) {
                    var hostIndex = host.indexOf(hostPartToCheck);
                    return hostIndex === 0;
                }

                return _.any(flexibleConnectionHosts, hostMathes);
            },

            useWebSockets: function useWebSockets() {
                var href = window.location.href || "";
                return WebSocket !== undefined && href.indexOf("use-rest") < 0;
            },

            /**
             * Get the URL of application.
             *
             * @returns {String} base URL of front end
             */
            getBaseURL: function getApplicationBaseURL() {
                return window.location.href.split('#')[0];
            },

            getUIString: function (key) {
                var formattingArguments = [ UIStrings[key] ];
                formattingArguments.push.apply(formattingArguments, Array.prototype.slice.call(arguments, 1));

                return sprintf.apply(this, formattingArguments);
            },

            Settings: {
                storage: null,
                localStorageAlternative: {
                    storageMap: {},
                    getItem: function (key) {
                        return this.storageMap[key];
                    },
                    setItem: function (key, value) {
                        this.storageMap[key] = value;
                    },
                    removeItem: function (key) {
                        delete this.storageMap[key];
                    }
                },
                initStorage: function () {
                    if (!(this.storage instanceof Object)) {
                        this.storage = window.localStorage;
                        try {
                            this.storage.setItem("hedvig-test", true);
                            this.storage.removeItem("hedvig-test");
                        } catch (e) {
                            this.storage = this.localStorageAlternative;
                        }
                    }
                },
                getStorageKey: function (settingKey) {
                    return "hedvig-" + settingKey;
                },
                get: function (settingKey) {
                    var item;

                    this.initStorage();

                    item = this.storage.getItem(this.getStorageKey(settingKey));
                    if (typeof item === "string") {
                        try {
                            item = JSON.parse(item);
                        } catch (ignore) {
                            // can be
                        }
                    }
                    return item;
                },
                set: function (settingKey, value) {
                    this.initStorage();

                    if (value instanceof Object) {
                        value = JSON.stringify(value);
                    }
                    return this.storage.setItem(this.getStorageKey(settingKey), value);
                },
                remove: function (settingKey) {
                    this.initStorage();

                    return this.storage.removeItem(this.getStorageKey(settingKey));
                }
            },


            Performance: Performance
        };
    }
);