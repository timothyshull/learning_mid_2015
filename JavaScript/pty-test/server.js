/*jslint node: true*/
'use strict';
var repl = require('repl'),
    net = require('net'),
    pty = require('./pty.js/lib/pty.js'),
    term = pty.spawn('bash', [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env
    });

// term.on('data', function(data) {
//     console.log(data);
// );

// term.write('ls\r');
// term.resize(100, 40);
// term.write('ls /\r');

// console.log(term.process);
net.createServer(function (socket) {
    console.log('CONNECTED: ' + socket.remoteAddress +':'+ socket.remotePort);

    socket.on('data', function(data) {
        term.write(data.toString());
        term.on('data', function(data){

            socket.write(data.toString());
        });
    });

    socket.on('close', function(data) {
        console.log('CLOSED: ' + socket.remoteAddress +' '+ socket.remotePort);
    });
}).listen(1337);
