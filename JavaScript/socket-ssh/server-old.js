//
// This server will start a bash shell and expose it
// over socket.io to a browser. See ./term.html for the
// client side.
//
// You should probably:
//
//   npm install socket.io
//   curl -O https://github.com/LearnBoost/Socket.IO/raw/master/socket.io.min.js
//
// To get socket.io in the node_modules directory and
// the socket.io.min.js file needed for the client.
//
// To start the server:
//
//   node server.js
//
// And then load up your term!
//
//   open http://`hostname`:8080/term.html
//
// You can even share the url with a friend on your
// local network. Be sure they're a friend though :-)
//

var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    io = require('./node_modules/socket.io'),
//sys = require('sys'),
    util = require('util'),
    spawn = require('child_process').spawn;

var sh = spawn('bash');

sh.stdout.on('data', function (data) {
    listener.broadcast(data);
});

sh.stderr.on('data', function (data) {
    listener.broadcast(data);
});

sh.on('exit', function (code) {
    listener.broadcast('** Shell exited: ' + code + ' **');
});

server = http.createServer(function (request, response) {
        var uri = url.parse(request.url).pathname;
        var filename = path.join(process.cwd(), uri);
        fs.exists(filename, function (exists) {
            if (!exists) {
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.end("Can''t find it...");
            }
            fs.readFile(filename, 'binary', function (err, file) {
                if (err) {
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.end(err + "\n");
                    return;
                }
                response.writeHead(200);
                response.write(file, 'binary');
                response.end();

            });
        });
    }
);

server.listen(8001);

var listener = io.listen(server);

listener.on('connection', function (client) {
    client.on('message', function (data) {
        sh.stdin.write(data + "\n");
        listener.broadcast(new Buffer("> " + data));
    });
});