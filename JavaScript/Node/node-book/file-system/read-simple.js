/*jslint node: true*/
"use strict";
const fs = require("fs");

fs.readFile(__dirname + "/target.txt", function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data.toString());
});