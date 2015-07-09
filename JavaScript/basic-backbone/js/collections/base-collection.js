/*global define */
define([
    'lodash',
    'backbone',
    'backboneLocalstorage',
    'models/base'
], function (_, Backbone, Store, Base) {
    'use strict';

    var TodosCollection = Backbone.Collection.extend({
        model: Base,

        localStorage: new Store('basic-backbone'),

        comparator: 'order'
    });

    return new TodosCollection();
});
