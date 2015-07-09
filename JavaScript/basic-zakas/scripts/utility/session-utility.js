/*global define */
define(
    [
        "utility/AppUtility"
    ],
    function (AppUtility) {
        "use strict";

        var hedvigSessionStorageKey = "session";

        return {
            /**
             * Get current session object stored in local storage.
             *
             * @returns {Object} session object
             */
            getSession: function getSessionFromStorage() {
                return AppUtility.Settings.get(hedvigSessionStorageKey);
            },

            /**
             * Save current session object to local storage
             * @param {Object} [data] session storage data
             */
            setSession: function setSessionToStorage(data) {
                AppUtility.Settings.set(hedvigSessionStorageKey, data);
            },


            /**
             * Remove session object from local storage.
             */
            removeSession: function removeSessionFromStorage() {
                AppUtility.Settings.remove(hedvigSessionStorageKey);
            },

            /**
             * Certain things such as seeing hPods and rereplications are only granted to admin
             */
            isAdministrator: function () {
                var session = this.getSession();
                return session instanceof Object && typeof session.username === "string" &&
                    (session.username.toLowerCase() === "admin" || session.username.toLowerCase() === "hedvigadmin");
            }
        };
    }
);