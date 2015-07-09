/*jslint node: true*/
'use strict';
var request = require('request');

exports['create bundle'] = function (test) {
    test.expect(1);

    request({
        method: 'POST',
        url: 'http://localhost:3000/api/bundle/integration test bundle'
    }, function (err, res, body) {
        console.log(body);
        test.done();
    });
};