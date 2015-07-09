/*jslint node: true*/
"use strict";

const net = require("net"),
    ldj = require(__dirname + "/ldj.js"),
    netClient = net.connect({port: 8001}),
    ldjClient = ldj.connect(netClient);

ldjClient.on("message", function(message) {
    if (message.type === "watching") {
        console.log("Watching: " + message.file);
    } else if (message.type === "changed") {
        console.log("File \"" + message.file + "\" changed at " + new Date(message.timestamp));
    } else {
        throw Error("Unrecognized message type: " + message.type);
    }
});