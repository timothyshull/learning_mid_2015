/*global define*/
/*jslint nomen: true*/
define(
    [
        'lodash',
        'backbone'
    ],
    function (_, Backbone) {
        'use strict';

        var BaseModel = Backbone.Model.extend({

            initialize: function () {
                this.users = ['fred', 'barney'];
            }
        });

        return BaseModel;
    }
);
