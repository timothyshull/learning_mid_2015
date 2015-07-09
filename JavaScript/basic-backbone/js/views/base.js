/*global define*/
/*jslint nomen: true*/
define(
    [
        'jquery',
        'lodash',
        'backbone',
        'text!templates/base.html'
    ],
    function ($, _, Backbone, baseTemplate) {
        'use strict';

        var BaseView = Backbone.View.extend({

            el: '.main',

            template: _.template(baseTemplate),

            events: {
                //'click .toggle': 'toggleCompleted'
            },

            initialize: function () {
                this.listenTo(this.model, 'change', this.render);
            },

            // Re-render the titles of the todo item.
            render: function () {
                this.$el.html(this.template(this.model));
                return this;
            },

            clear: function () {
                this.model.destroy();
            }
        });

        return BaseView;
    }
);