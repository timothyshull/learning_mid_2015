/*jslint node: true*/
"use strict";

const fs = require("fs"),
    zmq = require("zmq"),
    publisher = zmq.socket("pub"),
    filename = process.argv[2],
    fullFile = __dirname + "/" + filename;

fs.watch(fullFile, function() {
    publisher.send(JSON.stringify({
        type: "changed",
        file: filename,
        timestamp: Date.now()
    }));
});

publisher.bind("tcp://*:8001", function(err) {
    console.log("Listening for 0MQ connections...");
});