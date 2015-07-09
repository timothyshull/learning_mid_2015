
define([
  'jquery',
  'lodash',
  'backbone',
  'views/MainView', 
  'views/cabin/CabinView'
], function ($, _, Backbone, MainView, CabinView) {
  
  var Router = Backbone.Router.extend({
    routes: {
      '*actions': 'defaultAction',
      'messages': 'showMessageAboutMongo', // All urls will trigger this route
      'about': 'showAbout' 
    }
  });

  var initialize = function(){
		
    //var vent = _.extend({}, Backbone.Events);
    var router = new Router();

    console.log("Router initialized");

		router.on('route:defaultAction', function (actions) {

        var mainView = new MainView();
        mainView.render();

        var cabinView = new CabinView();
        cabinView.render();

        console.log("default route");
        
		});

    router.on('route:showMessageAboutMongo', function () {

      console.log("display helpful message about setting up mongo");
        
    });

    router.on('route:showAbout', function () {

      console.log("display about");
        
    });

    Backbone.history.start();
    
  };
  return {
    initialize: initialize
  };
});