/*global require, prompt*/
/*jslint nomen: true*/
require.config({
    shim: {
        // 'jquery': {
//             exports: '$'
//         },
//         'lodash': {
//             exports: '_'
//         },
//         'backbone': {
//             deps: ['jquery', 'underscore'],
//             exports: 'Backbone'
//         }
    },
    map: {
        'backbone': {
            'underscore': 'lodash'
        }
    }
});

require(["app"]);
