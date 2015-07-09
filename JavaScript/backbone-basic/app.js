/*global define, prompt*/
/*jslint nomen: true*/
define(["jquery", "lodash", "backbone"],
    function ($, _, Backbone) {
        "use strict";
        var Friend, Friends, appView, AppView;

        Friend = Backbone.Model.extend({
            name: null
        });

        Friends = Backbone.Collection.extend({
            initialize: function (models, options) {
                this.bind("add", options.view.addFriendListItem);
            }
        });

        AppView = Backbone.View.extend({
            el: $("body"),
            initialize: function () {
                this.friends = new Friends(null, {
                    view: this
                });
            },
            events: {
                "click .add-friend": "getInput"
            },
            getInput: function () {
                var friend_name = $(".friend-input").val(),
                    friend_model = new Friend({
                        name: friend_name
                    });
                this.friends.add(friend_model);
                $(".friend-input").val("");
            },
            addFriendListItem: function (model) {
                $(".friends-list").append("<li>" + model.get("name") + "</li>");
            }
        });

        appView = new AppView();
    }
);