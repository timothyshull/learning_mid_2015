/*jslint node: true*/
"use strict";
const fs = require("fs"),
    net = require("net"),

    filename = process.argv[2],

    server = net.createServer(function(connection) {
        console.log("Connection established...");
        //connection.write("Watching \"" + __dirname + "/" + filename + "\" for changes\n");
        connection.write(JSON.stringify({
            type: "watching",
            file: __dirname + "/" + filename
        }) + "\n");

        let watcher = fs.watch(__dirname + "/" + filename, function () {
            connection.write(JSON.stringify({
                    type: "changed",
                    file: __dirname + "/" + filename,
                    timestamp: Date.now()
                }) + "\n");
        });

        connection.on("close", function () {
            console.log("Subscriber disconnected");
            watcher.close();
        });
    });

if (!filename) {
    throw Error("No target file specified");
}

// use telnet localhost port
server.listen(8001, function () {
    console.log("Listening for WebSockets connections...");
});