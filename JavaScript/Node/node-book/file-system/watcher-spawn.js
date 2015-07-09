/*jslint node: true*/
"use strict";
const fs = require("fs"),
    filename = process.argv[2],
    spawn = require("child_process").spawn;

if (!filename) {
    throw Error("Please specify a filename");
}

fs.watch(__dirname + "/" + filename, function () {
    let ls = spawn("ls", ["-lh", __dirname + "/" + filename]);
    ls.stdout.pipe(process.stdout);
});
console.log("Now watching " + filename + " for changes");