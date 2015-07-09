#!/usr/bin/env node --harmony
'use strict';
const

    log = require('npmlog'),
    request = require('request'),

    express = require('express'),
    serveStatic = require('serve-static'),
    session = require('express-session'),
    logger = require('express-logger'),
    cookieParser = require('cookie-parser'),
    json = require('express-json'),
    passport = require('passport'),
    app = express(),

    redisClient = require('redis').createClient(),
    RedisStore = require('connect-redis')(session),

    GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

redisClient
    .on('ready', function () {
        log.info('REDIS', 'ready');
    })
    .on('error', function (err) {
        log.error('REDIS', err.message);
    });

passport.serializeUser(function (user, done) {
    done(null, user.identifier);
});
passport.deserializeUser(function (id, done) {
    done(null, {identifier: id});
});
passport.use(new GoogleStrategy({
        returnURL: 'http://localhost:3000/auth/google/return',
        realm: 'http://localhost:3000/'
    },
    function (identifier, profile, done) {
        profile.identifier = identifier;
        return done(null, profile);
    }
));

//passport.use(new GoogleStrategy({
//        clientID: GOOGLE_CLIENT_ID,
//        clientSecret: GOOGLE_CLIENT_SECRET,
//        callbackURL: "http://127.0.0.1:3000/auth/google/callback"
//    },
//    function(accessToken, refreshToken, profile, done) {
//        User.findOrCreate({ googleId: profile.id }, function (err, user) {
//            return done(err, user);
//        });
//    }
//));
//
//app.get('/auth/google',
//    passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));
//
//app.get('/auth/google/callback',
//    passport.authenticate('google', { failureRedirect: '/login' }),
//    function(req, res) {
//        // Successful authentication, redirect home.
//        res.redirect('/');
//    });

app.use(logger({path: "dev/logfile.txt"}));
app.use(cookieParser());
app.use(session({
    secret: 'unguessable',
    store: new RedisStore({
        client: redisClient
    }),
    resave: true,
    saveUninitialized: true
}));

//app.use(session({
//    genid: function(req) {
//        return genuuid() // use UUIDs for session IDs
//    },
//    secret: 'keyboard cat'
//}))

app.use(passport.initialize());
app.use(passport.session());
app.use(serveStatic(__dirname + '/static'));
app.use(serveStatic(__dirname + '/bower_components'));

const config = {
    bookdb: 'http://localhost:5984/books/',
    b4db: 'http://localhost:5984/b4/'
};
require('./lib/book-search.js')(config, app);
require('./lib/field-search.js')(config, app);
require('./lib/bundle.js')(config, app);

app.get('/auth/google/:return?',
    passport.authenticate('google', {successRedirect: '/'})
);
app.get('/auth/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

const authed = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else if (redisClient.ready) {
        res.status(403).json({
            error: "forbidden",
            reason: "not_authenticated"
        });
    } else {
        res.status(503).json({
            error: "service_unavailable",
            reason: "authentication_unavailable"
        });
    }
};

app.get('/api/user', authed, function (req, res) {
    res.status(200).json(req.user);
});

app.get('/api/user/bundles', authed, function (req, res) {
    let userURL = config.b4db + encodeURIComponent(req.user.identifier);
    request(userURL, function (err, couchRes, body) {
        if (err) {
            res.status(502).json({error: "bad_gateway", reason: err.code});
        } else if (couchRes.statusCode === 200) {
            res.status(200).json(JSON.parse(body).bundles || {});
        } else {
            res.send(couchRes.statusCode, body);
        }
    });
});

app.put('/api/user/bundles', [authed, json()], function (req, res) {
    let userURL = config.b4db + encodeURIComponent(req.user.identifier);
    request(userURL, function (err, couchRes, body) {
        if (err) {
            res.status(502).json({error: "bad_gateway", reason: err.code});
        } else if (couchRes.statusCode === 200) {
            let user = JSON.parse(body);
            user.bundles = req.body;
            request.put({url: userURL, json: user}).pipe(res);
        } else if (couchRes.statusCode === 404) {
            let user = {bundles: req.body};
            request.put({url: userURL, json: user}).pipe(res);
        } else {
            res.send(couchRes.statusCode, body);
        }
    });
});

app.listen(3000, function () {
    console.log("ready captain.");
});



