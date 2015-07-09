#!/usr/bin/env node --harmony
'use strict';
const express = require('express'),
    logger = require('express-logger'),
    app = express();

app.use(logger({path: 'dev'}));
app.get('/api/:name', function (req, res) {
    //res.json(200, {"hello": req.params.name});
    res.status(200).json({"hello": req.params.name});
});
app.listen(3000, function () {
    console.log("ready captain.");
});