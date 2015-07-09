define([
  'jquery',
  'lodash',
  'backbone',
  'models/MessageModel'
], function($, _, Backbone, MessageModel){
  var MessagesCollection = Backbone.Collection.extend({
    model: MessageModel,
      url: 'http://localhost:8888/messages'
  });

  return MessagesCollection;
});