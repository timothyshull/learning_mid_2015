/*jslint node: true*/
"use strict";
const fs = require("fs");

fs.watch(__dirname + "/target.txt", function () {
    console.log("File \"target.txt\" changed");
});
console.log("Now watching \"target.txt\" for changes");