/*jslint node: true*/
"use strict";
const fs = require("fs"),
    net = require("net"),

    filename = process.argv[2],

    server = net.createServer(function(connection) {
        console.log("Connection established...");

        connection.write("{\"type\":\"changed\",\"file\":\"targ");

        let timer = setTimeout(function () {
            connection.write("et.txt\", \"timestamp\":1358175758495}" + "\n");
            connection.end();
        }, 1000);

        connection.on("end", function () {
            clearTimeout(timer);
            console.log("Subscriber disconnected");
        });
    });

// use telnet localhost port
server.listen(8001, function () {
    console.log("Listening for WebSockets connections...");
});