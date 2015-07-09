/*jslint node: true*/
'use strict';
const request = require('request');
module.exports = function (config, app) {
    app.get('/api/search/book/by_:view', function (req, res) {
        request({
            method: 'GET',
            url: config.bookdb + '_design/books/_view/by_' + req.params.view,
            qs: {
                key: JSON.stringify(req.query.q),
                reduce: false,
                include_docs: true
            }
        }, function (err, couchRes, body) {

            if (err) {
                res.json(502, {error: "bad_gateway", reason: err.code});
                return;
            }

            if (couchRes.statusCode !== 200) {
                res.json(couchRes.statusCode, JSON.parse(body));
                return;
            }

            let books = {};
            JSON.parse(body).rows.forEach(function (elem) {
                books[elem.doc._id] = elem.doc.title;
            });
            res.json(books);

        });
    });
};
