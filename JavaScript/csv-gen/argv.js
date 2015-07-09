/*jslint node: true*/
'use strict';
var colTypes = {},
    types = ['object', 'boolean', 'number', 'string', 'array'],
    i, j,
    _ = require('./lodash.custom.js'),
    outArray = [], temp, numCols;

function makeString(len) {
    var text = "",
        possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (j = 0; j < len; j++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

if (process.argv.length > 2) {
    for (i = 2; i < process.argv.length - 1; i += 1) {
        if (process.argv[i].match(/:/).length !== 1) {
            console.log('Format: \<columnHeader:type\>');
        } else {
            if (_.includes(types, process.argv[i].split(':')[1])) {
                colTypes[process.argv[i].split(':')[0]] = process.argv[i].split(':')[1];
            } else {
                console.log('Type must be one of the following: ' + '\n');
                types.forEach(function (elem) {
                    console.log(elem);
                });
            }
        }
    }
} else {
    console.log('Usage: node argv columnName:type...');
}

for (i = 0; i <= process.argv[process.argv.length - 1]; i += 1) {
    outArray[i] = [];
    for (j = 0; j < process.argv.length - 3; i += 1) {
        outArray[i][j] = makeString(3);
    }
}

console.dir(outArray);

console.log(typeof Object());
console.log(typeof Boolean());
console.log(typeof Number());
console.log(typeof Date());
console.log(typeof Array());
