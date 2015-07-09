/*global require*/
/*jslint node: true, stupid: true, nomen: true*/
'use strict';

var url = require('url'),
    path = require('path'),
    fs = require('fs'),
    spawn = require('child_process').spawn,
    sh = spawn('bash'),
    express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    port = 8001;

app.set('env', 'development');
// app.use(favicon(__dirname + '/client/assets/favicon.ico'));
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());
// app.use('/', express.static(__dirname + '/client'));

server.listen(port, function () {
    process.stdout.write("Now listening on port " + port + "...");
});

// basic version - serve all assets, clean-up for production
app.get('/*', function (req, res) {
    var uri = url.parse(req.url).pathname,
        fileName = path.join(process.cwd(), uri);

    fs.exists(fileName, function (exists) {
        if (!exists) {
            res.status(404).send("Unable to locate resource " + uri);
        }
        res.sendFile(fileName, function (err) {
            if (err) {
                console.log(err);
                res.status(err.status).end();
            } else {
                console.log('Serving ', fileName);
            }
        });
    });
});

// handle socket.io communication
io.on('connection', function (socket) {
    socket.on('cmd', function (data) {
        sh.stdin.write(data + "\n");
    });

    sh.stdout.on('data', function (data) {
        socket.emit('response', data.toString());
    });

    sh.stderr.on('data', function (data) {
        socket.emit('err', data.toString());
    });

    sh.on('exit', function (data) {
       socket.emit('response', '** Shell exited: ' + data + ' **');
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    /*jslint unparam: true*/
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        /*jslint unparam: true*/
        res.status(err.status || 500).send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    /*jslint unparam: true*/
    res.status(err.status || 500).send({
        message: err.message,
        error: {}
    });
});


module.exports = app;

