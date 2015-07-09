/*jslint node: true*/
"use strict";
const fs = require("fs");
let text = "String to write to file";

fs.writeFile(__dirname + "/target.txt", text, function (err) {
    if (err) {
        throw err;
    }
    console.log("The following text was written to the file: " + text);
});