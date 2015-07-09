/*jslint node: true*/
"use strict";
const fs = require("fs"),
    filename = process.argv[2];

if (!filename) {
    throw Error("A file must be specified");
}
fs.watch(__dirname + "/" + filename, function () {
    console.log("File " + filename + " has changed");
});
console.log("Now watching " + filename + " for changes");