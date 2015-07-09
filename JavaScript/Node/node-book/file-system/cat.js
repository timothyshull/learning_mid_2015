#!/usr/bin/env node --harmony
require("fs").createReadStream(__dirname + "/" + process.argv[2]).pipe(process.stdout);