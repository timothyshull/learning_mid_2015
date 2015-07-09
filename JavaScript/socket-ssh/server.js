/*global require*/
/*jslint node: true, stupid: true, nomen: true*/
'use strict';

var url = require('url'),
    path = require('path'),
    fs = require('fs'),
    spawn = require('child_process').spawn,
    //sh = spawn('bash', [], {detached: true, stdio: 'pipe'}),
    sh = spawn('bash'),
    express = require('express'),
    https = require('https'),
    app = express(),
    server = https.createServer({key: fs.readFileSync('key.pem'), cert: fs.readFileSync('cert.pem')}, app),
    io = require('socket.io').listen(server),
    ss = require('socket.io-stream'),
    //stream = ss.createStream(io),
    //client = require('socket.io-client'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    basicAuth = require('basic-auth'),
    bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10),
//pw = (fs.readFileSync(__dirname + '/pw.txt')).toString().trim(),
    hash = bcrypt.hashSync(process.env.TEST_PW, salt),
    hashUser = bcrypt.hashSync(process.env.TEST_USER, salt),
    port = 8001;

//process.stdin.on('readable', function () {
//    //var chunk = process.stdin.read();
//    process.stdout.write('data\n');
//    //if (chunk !== null) {
//    //    process.stdout.write('data: ' + chunk);
//    //}
//});


function authenticate(req, res, next) {
    var user = basicAuth(req);

    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.status(401).send('Not authorized');
    }

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }

    if (bcrypt.compareSync(user.name, hashUser) && bcrypt.compareSync(user.pass, hash)) {
        return next();
    }

    return unauthorized(res);
}

app.set('env', 'development');
app.use(favicon(__dirname + '/client/assets/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(__dirname + '/client'));

server.listen(port, function () {
    //console.log("Now listening on port " + port + "...");
    process.stdout.write("Now listening on port " + port + "...");
});

// basic version - serve all assets, clean-up for production
app.get('/*', authenticate, function (req, res) {
    var uri = url.parse(req.url).pathname,
        fileName = path.join(process.cwd(), uri);

    fs.exists(fileName, function (exists) {
        if (!exists) {
            res.status(404).send("Unable to locate resource " + uri);
            //res.writeHead(404, {'Content-Type': 'text/plain'});
            //res.end("Unable to locate " + uri);
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
    //socket.on('cmd', function (data) {
    //    sh.stdin.write(data + "\n");
    //    console.log(data);
    //});
    //
    //sh.stdout.on('data', function (data) {
    //    socket.emit('response', (new Buffer(data)).toString());
    //});
    //
    //sh.stderr.on('data', function (data) {
    //    socket.emit('response', (new Buffer(data)).toString());
    //});
    //
    //sh.on('exit', function (code) {
    //    socket.emit('response', '** Shell exited: ' + code + ' **');
    //});

    //ss(socket).on('cmd', function(stream, data) {
    //    stream.pipe(sh.stdin.write(data + '\n'));
    //    console.log(data);
    //});

    //sh.stdout.setEncoding('utf-8');

    //console.dir(sh.stdin.pipe);
    //console.dir(sh.stdout.pipe);

    socket.on('cmd', function (data) {
        sh.stdin.write(data + "\n");
        //console.log(data);
    });

    //var stream = ss.createStream();

    //stream.pipe
    //
    sh.stdout.on('readable', function () {
        var buff = sh.stdout.read();
        //ss(socket).emit('response', buff);
        if (buff !== null) {
            console.dir(buff.toString());
            socket.emit('response', buff.toString());
            //socket.emit('response', 'this string');
        }
    });
    //
    //process.stdout.on('readable', function () {
    //    var buff = sh.stdout.read();
    //
    //    //ss(socket).emit('response', buff);
    //    if (buff !== null) {
    //        console.dir(buff);
    //        socket.emit('response', buff.toString());
    //        //socket.emit('response', 'this string');
    //    }
    //});

    //ss(socket).on('cmd', function (stream, data) {
    //    stream.pipe(sh.stdin.write(data + '\n'));
    //    //sh.stdin.pipe(stream.pipe(data + '\n'));
    //    console.log(data);
    //});

    //sh.stdout.on('data', function (data) {
    //    //ss(socket).emit('response', stream);
    //    //ss(socket).emit('response', stream);
    //    socket.emit('response', data);
    //    //stream.pipe(data);
    //});
    //
    //sh.stderr.on('data', function (data) {
    //    //ss(socket).emit('response', stream);
    //    socket.emit('response', data);
    //    //stream.pipe(data.toString());
    //});
    //
    //sh.on('exit', function (data) {
    //    //ss(socket).emit('response', stream);
    //    socket.emit('response', '** Shell exited: ' + data + ' **');
    //    //stream.pipe('** Shell exited: ' + code + ' **');
    //});
});

//io.of('/user').on('connection', function(socket) {
//    ss(socket).on('profile-image', function(stream, data) {
//        var filename = path.basename(data.name);
//        stream.pipe(fs.createWriteStream(filename));
//    });
//});

//ss(socket).emit('file', stream);
//stream.pipe(fs.createWriteStream('file.txt'));

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

/*
 //To hash a password:

 var bcrypt = require('bcrypt');
 var salt = bcrypt.genSaltSync(10);
 var hash = bcrypt.hashSync('B4c0/\/', salt);
 // Store hash in your password DB.


 //To check a password:

 // Load hash from your password DB.
 bcrypt.compareSync('B4c0/\/', hash); // true
 bcrypt.compareSync('not_bacon', hash); // false


 //Auto-gen a salt and hash:

 var hash = bcrypt.hashSync('bacon', 8);
 */
