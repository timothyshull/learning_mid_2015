/*jslint node: true*/
"use strict";

const zmq = require("zmq"),
    filename = process.argv[2],
    request = zmq.socket("req");

request.on("message", function(data) {
    let response = JSON.parse(data);
    console.log("Received response: ", response);
});

request.connect("tcp://127.0.0.1:8001");

for (let i = 1; i <= 3; i++) {
    console.log("Sending request for " + filename);

    request.send(JSON.stringify({
        path: filename
    }));
}