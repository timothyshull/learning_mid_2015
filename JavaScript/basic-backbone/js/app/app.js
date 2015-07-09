/*global define*/
define([
    'jquery',
    'lodash',
    'backbone',
    'models/base',
    'views/base',
    'text!templates/base.html'
], function ($, _, Backbone, BaseModel, BaseView, baseTemplate) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: '.template',

        template: _.template(baseTemplate),

        events: {},

        initialize: function () {
            this.$main = this.$('.main');
            var base = new BaseView({model: new BaseModel()});
            base.render();
        },

        render: function () {
            this.$main.show();
        }
    });

    return AppView;
});
