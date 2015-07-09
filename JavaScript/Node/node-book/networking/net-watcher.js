/*jslint node: true*/
"use strict";
const fs = require("fs"),
    net = require("net"),

    filename = process.argv[2],

    connectionType = process.argv[3],

    server = net.createServer(function(connection) {
        console.log("Connection established...");
        connection.write("Watching \"" + __dirname + "/" + filename + "\" for changes\n");

        let watcher = fs.watch(__dirname + "/" + filename, function () {
            connection.write("File \"" + __dirname + "/" + filename + "\" changed: " + Date.now() + "\n");
        });

        connection.on("close", function () {
            console.log("Subscriber disconnected");
            watcher.close();
        });
    });

if (!filename) {
    throw Error("No target file specified");
}

if (!connectionType) {
    throw Error("No connection type specified");
}

// use netcat -U + socket location
if (connectionType === "unix") {
    process.on('SIGINT', function() {
        console.log('\nClosing socket');
        server.close(function() {
            process.exit(1)
        });
    });

    server.listen(__dirname + "/tmp/watcher.sock", function () {
        console.log("Listening for Unix socket connections...");
    });
}

// use telnet localhost port
if (connectionType === "websockets") {
    server.listen(8001, function () {
        console.log("Listening for WebSockets connections...");
    });
}