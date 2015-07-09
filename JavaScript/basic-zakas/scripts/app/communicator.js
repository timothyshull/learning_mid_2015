define(
    [
        "app/core",
        "sockjs",
        // "utility/SessionUtility",
        // "utility/PermissionUtility",
        // "utility/AppUtility",
        // "utility/ClusterUtility",
        // "modules/websockets-communicator.requests",
        "app/logger",

        "underscore"
    ],
        function (core, SockJS, log, _) {
        "use strict";

        core.register("communicator", function WebsocketsCommunicator(sandbox) {
            var connection,
                defaultPort = 8080,
                closeSocketInitiated = false,
                requests = {},
                compoundRequests = {},
                checkInterval,
                checkTime = 1000,
                compoundFireupTime = 10,
                requestExpirationTime = 30,
                active = false,
                pushRequestId = "INFO-FROM-SRVR-SIDE",
                requestManagers = ManagerContainer.requestManagers,
                typeManagerMap = _.object(_(requestManagers).pluck("type"), requestManagers),
                exchangeTypeManagerMap = _.object(_(requestManagers).pluck("exchangeType"), requestManagers),
                reconnect,
                getCurrentTime
                scokjs;

            if (AppUtility.Performance.isSupported()) {
                getCurrentTime = performance.now.bind(performance);
            } else {
                getCurrentTime = function () {
                    return +new Date();
                };
            }

            (function checkManagers() {
                _(typeManagerMap).map(function (manager, managerType) {
                    if (typeof managerType !== "string" || !(manager instanceof Object) || !manager.hasOwnProperty("exchangeType")) {
                        log.error("Wrong request manager entry: ", managerType, "->", manager);
                    }
                });
            }());

            function getConnectionUrl(host, port) {
                var url = "ws://" + host;

                if (host.indexOf(":") < 0) {
                    url += ":" + (port || defaultPort);
                } else {
                    url;
                }

                return url;
            }


            function isServerInitiated(requestId) {
                return requestId === pushRequestId;
            }

            function fireupCompoundResponse(data, requestManager, compoundRequest) {
                if (typeof requestManager.processCompound === "function") {
                    data = requestManager.processCompound(data, compoundRequest.exchangeRequest);
                }
                sandbox.notify({
                    type: requestManager.type + "-result",
                    data: data
                });
            }

            // GENERIC
            function processResponse(exchangeResponse, requestPayload) {
                var requestManager,
                    response,
                    compoundRequest,
                    requestEmpty = !(requestPayload instanceof Object);

                if (requestPayload) {
                    requestManager = typeManagerMap[requestPayload.type];
                } else {
                    if (exchangeTypeManagerMap.hasOwnProperty(exchangeResponse.type)) {
                        requestManager = exchangeTypeManagerMap[exchangeResponse.type];

                        if (isServerInitiated(exchangeResponse.requestId) && !requestManager.processPushRequests) {
                            requestManager = null;
                        }
                    }
                }

                // If any request ends up with session failure, show user a log in screen
                if (exchangeResponse.status === "session-failure") {
                    sandbox.notify({
                        type: "request-state-change",
                        data: {
                            section: "login"
                        }
                    });
                    return;
                }

                if (requestManager) {
                    requestPayload = requestPayload || {};
                    response = requestManager.exchangeToResponse(exchangeResponse, requestPayload.data, requestPayload.isBatch);
                    response.hedvigDataSource = requestEmpty ? AppUtility.Constants.DataSources.Cluster : AppUtility.Constants.DataSources.CurrentUser;

                    compoundRequest = typeof requestPayload.compoundId === "string";

                    if (!compoundRequest) {
                        sandbox.notify({
                            type: requestManager.type + "-result",
                            data: response
                        });
                    } else {
                        (function processCompoundResponse() {
                            compoundRequest = compoundRequests[requestPayload.compoundId];
                            if (compoundRequest instanceof Object) {
                                compoundRequest.responses.push(response);
                                // check if all responses have arrived for compound request

                                if (compoundRequest.responses.length === compoundRequest.requestCount) {
                                    fireupCompoundResponse(compoundRequest.responses, requestManager, compoundRequests[requestPayload.compoundId]);
                                    compoundRequest.responses = [];
                                }
                            }
                        }());
                    }

                } else {
                    throw new Error(AppUtility.getUIString("websockets.process.response")); // UISTRING
                }
            }


            /**
             * This handler executes when the socket is opened. It may be opened for a first time or it
             * may be reopened after a disconnection.
             */
            function webSocketOpenHandler() {
                log.debug("WebSocket opened");

                // Send a notification that the socket is open (connection is established)
                sandbox.notify({
                    type: "connection-status",
                    data: "open"
                });

                // There can be deferred requests awaiting to be sent. Go through them and send out.
                _.each(_.values(requests), function (request) {
                    if (request.status === "deferred") {
                        // reset timeout to give it standard time to load
                        request.time = getCurrentTime();

                        processResponse({
                            "status": "progress",
                            "message": AppUtility.getUIString("websockets.connection.established") // UISTRING
                        }, request.payload);

                        // send it now
                        log.debug("WebSocket - sending deferred message", request.text);
                        connection.send(request.text);
                        request.status = "sent";
                    }
                });
            }


            // GENERIC
            /**
             * Processes the received message.
             * @param {String} [messageString] contains serialized JSON message
             */
            function processMessage(messageString) {
                var requestId,                      // :String
                    shouldProcessResponse = true,
                    result,                         // {:JSON Object}
                    resultForLogging,               // {:JSON Object}
                    request;                        //:Object;

                // Put the message to console for testing purposes. Truncate it so it doesn't take multiple lines
                log.debug("WebSocket - Message received", messageString.substr(0, 200) + "...");

                try {
                    result = JSON.parse(messageString);
                    // Parsing message string again so the console shows the object that won't be further modified
                    resultForLogging = JSON.parse(messageString);
                } catch (e) {
                    log.error("Can't parse the result");
                    return;
                }

                if (result instanceof Object) {
                    requestId = result.requestId;

                    if (typeof requestId === "string") {
                        // Try to find the request ID in requests map
                        if (_.has(requests, requestId)) {
                            // Get original request payload
                            request = requests[requestId].payload;

                            // Log testing data to console containing result and time it took from sending requests
                            // to current moment.
                            log.debug("[", Math.round(getCurrentTime() - requests[requestId].time), "ms ]", resultForLogging);

                            // if the request has succeeded, we don't need to store it any longer
                            delete requests[requestId];
                        } else if (!isServerInitiated(requestId)) { // If request ID can't be found in request map and
                            // it's not a message initiated by server, then this
                            // is a timed out request
                            log.debug("result", resultForLogging);
                            log.warn("This response has arrived for request", requestId, "which has timed out. It won't be processed");
                            shouldProcessResponse = false;
                        }
                    } else {
                        // If request ID is not set (or has a wrong type)
                        log.warn(AppUtility.getUIString("websockets.request.id", resultForLogging)); // UISTRING
                    }

                    if (shouldProcessResponse) {
                        processResponse(result, request);
                    }
                }
            }

            function webSocketMessageHandler(message) {
                processMessage(message.data);
            }

            // GENERIC
            function processError(error) {
                log.error("WebSocket Error", error || "");

                sandbox.notify({
                    type: "connection-status",
                    data: "error"
                });
            }

            /**
             * Error handler for web socket connection. Notifies the modules if it occurs.
             * @param error
             */
            function webSocketErrorHandler(error) {
                processError(error.data);
            }


            function processWebsocketClosing() {
                if (closeSocketInitiated) {
                    log.debug("WebSocket closed");
                } else {
                    log.warn("WebSocket closed");
                }

                if (!closeSocketInitiated && active) {
                    log.debug("Reconnecting…");
                    setTimeout(reconnect, 5000);
                }

                // Notify modules
                sandbox.notify({
                    type: "connection-status",
                    data: "closed"
                });

                // Set response of all pending requests to failure
                _.each(_.keys(requests), function (requestId) {
                    var request = requests[requestId];
                    processResponse({
                        "status": "failure",
                        "message": AppUtility.getUIString("websockets.connection.closed") // UISTRING
                    }, request.payload); // set failure
                    delete requests[requestId];
                });
            }

            /**
             * Close socket handler for web socket connection. Socket closing can be either initiated or sudden.
             * Notifies the modules if it occurs.
             */
            function webSocketCloseHandler() {
                processWebsocketClosing();
            }


            /**
             * Initiates a WebSocket connection.
             */
            function connect() {
                var host = ClusterUtility.getClusterHost();

                // Establish a connection
                connection = new SockJS(getConnectionUrl(host));

                connection.onopen = webSocketOpenHandler;
                connection.onmessage = webSocketMessageHandler;
                connection.onerror = webSocketErrorHandler;
                connection.onclose = webSocketCloseHandler;
            }

            reconnect = connect; // Only because JSLint complains that connect function is used in webSocketCloseHandler,
            // before it's defined. Connect, in turn, uses webSocketCloseHandler


            function openSocket() {
                connect();

                sandbox.notify({
                    type: "connection-status",
                    data: "connecting"
                });
            }

            function closeSocket() {
                if (connection && connection.readyState === 1) {
                    closeSocketInitiated = true;
                    connection.close();
                }

                sandbox.notify({
                    type: "connection-status",
                    data: "closed"
                });
            }

            // IMPLEMENTME
            function connnectionAvailable() {
                return connection && connection.readyState === 1;
            }

            // IMPLEMENT ME
            function requestSendingImplementation(stringToBeSent) {
                connection.send(stringToBeSent);
            }

            // GENERIC
            function sendRequest(payload, data) {
                var stringToBeSent = JSON.stringify(data),
                    request;

                // Store request
                request = requests[data.requestId] = {
                    payload: payload,
                    exchangeRequest: data,
                    time: getCurrentTime(),
                    text: stringToBeSent
                };


                if (connnectionAvailable()) {
                    processResponse({
                        "status": "progress",
                        "message": AppUtility.getUIString("websockets.loading") // UISTRING
                    }, request.payload);

                    log.debug("WebSocket - sending", stringToBeSent);
                    requestSendingImplementation(stringToBeSent);
                    requests[data.requestId].status = "sent";
                } else {
                    // will send when connection opens
                    log.debug("defer a WebSocket message to when the connection is established");
                    request.status = "deferred";

                    processResponse({
                        "status": "progress",
                        "message": AppUtility.getUIString("websockets.establishing.connection")// UISTRING
                    }, request.payload);
                }
            }

            // GENERIC
            function processSessionStatusChange(data) {
                if (data.status === "start") {
                    sandbox.model.setSession(_(data).omit("status"));

                    SessionUtility.setSession(_(data).omit("status"));
                    PermissionUtility.setPermissions(data.permissions);
                } else if (data.status === "end") {
                    sandbox.model.setSession(null);

                    SessionUtility.removeSession();
                    PermissionUtility.setPermissions(null);
                }
            }

            // GENERIC
            function processRequestNotification(payload) {
                function sendPayload(payload, requestManager) {
                    var sessionId = sandbox.model.getSessionId(),
                        exchangeRequest = requestManager.requestToExchange(payload.data);

                    // Inject session id, if present, into request
                    if (sessionId) {
                        exchangeRequest.sessionId = sessionId;
                    }

                    log.debug(" <- exchange request: ", exchangeRequest.type || "", exchangeRequest);

                    if (exchangeRequest) {
                        sendRequest(payload, exchangeRequest);
                    }

                    return exchangeRequest;
                }


                var requestType = payload.type,
                    requestManager = typeManagerMap[requestType],
                    compoundId/*,
                    scopeResponseToModule = payload.scopeResponseToModule*/;

                payload.data = payload.data || {};

                if (!requestManager) {
                    throw new Error(AppUtility.getUIString("websockets.no.manager", requestType)); // UISTRING
                }

                if (requestManager.compound) {
                    compoundId = _.uniqueId("compound-req-");
                    compoundRequests[compoundId] = {
                        id: compoundId,
                        requestCount: payload.data.length,
                        exchangeRequest: payload.data,
                        responses: [],
                        requestManager: requestManager,
                        time: getCurrentTime()
                    };

                    payload.data.forEach(function(payloadData) {
                        sendPayload({
                            type: payload.type,
                            data: payloadData,
                            compoundId: compoundId
                        }, requestManager);
                    });
                } else {
                    sendPayload(payload, requestManager);
                }
            }

            function checkForCompoundRequests() {
                var currentTime = getCurrentTime();

                _(compoundRequests).map(function (compoundRequest, requestId) {
                    var timePassed = currentTime - compoundRequest.time;

                    if (timePassed > compoundFireupTime * 1000) {
                        if (compoundRequest.responses.length > 0) {
                            fireupCompoundResponse(compoundRequest.responses, compoundRequest.requestManager, compoundRequest);
                            compoundRequest.responses = [];
                        }
                    }

                    if (timePassed > requestExpirationTime * 1000) {
                        delete compoundRequests[requestId];
                    }
                });
            }

            // GENERIC
            function checkForExpiredRequests() {
                var currentTime = getCurrentTime();

                _(requests).map(function (request, requestId) {
                    var timePassed = currentTime - request.time;

                    if (timePassed > requestExpirationTime * 1000) {
                        delete requests[requestId];
                        processResponse({
                            "status": "failure",
                            "message": AppUtility.getUIString("websockets.request.timeout") // UISTRING
                        }, request.payload); // set failure
                    }
                });
            }

            function checkForTimedRequests() {
                checkForExpiredRequests();
                checkForCompoundRequests();
            }


            return {
                sandbox: sandbox,

                init: function () {
                    var eventList = _(requestManagers).pluck("type"),
                        session = SessionUtility.getSession();

                    active = true;
                    eventList.push("session-status");
                    sandbox.listen(eventList, this);

                    if (session) {
                        sandbox.model.setSession(session);
                    }

                    requests = [];
                    checkInterval = setInterval(checkForTimedRequests, checkTime);

                    openSocket();
                },

                destroy: function () {
                    active = false;
                    clearInterval(checkInterval);
                    checkInterval = null;
                    closeSocket();
                },

                sendRequest: function (message) {
                    connection.send(message);
                },


                handleNotification: function (payload) {
                    switch (payload.type) {
                        case "session-status":
                            processSessionStatusChange(payload.data);
                            break;
                        default:
                            processRequestNotification(payload);
                            break;
                    }
                }
            };
        });
    }
);