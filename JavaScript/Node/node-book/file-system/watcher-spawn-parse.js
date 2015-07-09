/*jslint node: true*/
"use strict";
const fs = require("fs"),
    filename = process.argv[2],
    spawn = require("child_process").spawn;

if (!filename) {
    throw Error("Please specify a filename");
}

fs.watch(__dirname + "/" + filename, function () {
    let ls = spawn("ls", ["-lh", __dirname + "/" + filename]),
        output = "";

    ls.stdout.on("data", function(chunk) {
        output += chunk.toString();
    });

    ls.on("close", function () {
        let parts = output.split(/\s+/);
        console.dir([parts[0], parts[4], parts[8]]);
    });
});

console.log("Now watching " + filename + " for changes");