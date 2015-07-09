define([
        "lodash"
    ],
    function (_) {
        "use strict";

        var modelCreator = function () {
            return {
                basicInit: function() {
                    this.listeners = [];
                    this.status = null;
                    this.message = null;
                },


                setStatus: function (newStatus, newMessage) {
                    this.status = newStatus;
                    this.message = newMessage;

                    this.notifyViews({
                        type: "status-update",
                        data: {
                            status: this.status,
                            message: this.message
                        }
                    });
                },

                getStatus: function () {
                    return { status: this.status, message: this.message };
                },

                connectView: function (view) {
                    this.listeners.push(view);
                },

                notifyViews: function (payload) {
                    this.listeners.forEach(function notifyView(view) {
                        view.notify(payload);
                    });
                },

                notifyUpdate: function (type, data) {
                    this.notifyViews({ type: type, data: data });
                },

                setActionExecutionStatus: function (action, statuses, batch) {
                    var update = {
                        action: action,
                        statusData: statuses
                    };
                    if (batch != null) {
                        update.batch = batch;
                    }
                    this.notifyUpdate("metadata-update", update);
                }
            }
        };

        modelCreator.extend = function (extension) {
            var model = Object.create(modelCreator());
            model.basicInit();
            return _(model).extend(extension);
        }

        return modelCreator;
    }
);
