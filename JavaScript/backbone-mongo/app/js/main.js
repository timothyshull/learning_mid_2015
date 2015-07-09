require.config({
    paths: {
        jquery: 'lib/jquery',
        lodash: 'lib/lodash',
        backbone: 'libs/backbone/backbone-min',
        text: 'libs/text',
        templates: '../templates'
    },
    map: {
        'backbone': {
            'underscore': 'lodash'
        }
    }

});

require([
        'router/Router'
    ],
    function(Router) {
        Router.initialize();
    }
);
