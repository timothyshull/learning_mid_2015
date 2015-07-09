/*jslint node: true*/
"use strict";
const fs = require("fs"),
    stream = fs. createReadStream(process.argv[2]);

stream.on("data", function(chunk) {
    process.stdout.write(chunk);
});

stream.on("error", function(err) {
    process.stderr.write("Error: " + err.message + "\n");
});


var fs = require('fs');
var ws = fs.createWriteStream('message.txt');

ws.write('beep ');

setTimeout(function () {
    ws.end('boop\n');
}, 1000);
