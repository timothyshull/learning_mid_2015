/*jslint node: true*/
'use strict';
const request = require('request');
module.exports = function (config, app) {
    app.get('/api/search/:view', function (req, res) {
        request({
                method: 'GET',
                url: config.bookdb + '_design/books/_view/by_' + req.params.view,
                qs: {
                    startKey: JSON.stringify(req.query.q),
                    endkey: JSON.stringify(req.query.q + "\ufff0"),
                    group: true
                }
            },
            function (err, couchRes, body) {
                if (err) {
                    res.status(502).json({error: "bad_gateway", reason: err.code});
                    return;
                }

                if (couchRes.statusCode !== 200) {
                    res.status(couchRes.statusCode).json(JSON.parse(body));
                    return;
                }

                res.status(200).json(JSON.parse(body).rows.map(function (elem) {
                    return elem.key;
                }));

            }
        );
    });
};