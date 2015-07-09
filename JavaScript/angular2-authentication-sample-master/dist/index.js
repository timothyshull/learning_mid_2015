System.register("index", ["angular2/angular2", "angular2/src/router/router", "angular2/src/router/pipeline", "angular2/di", "angular2/router", "angular2/change_detection", "./app/app", "./utils/pipes/pipes"], function($__export) {
  "use strict";
  var __moduleName = "index";
  var bootstrap,
      RootRouter,
      Pipeline,
      bind,
      Router,
      PipeRegistry,
      App,
      pipes;
  return {
    setters: [function($__m) {
      bootstrap = $__m.bootstrap;
    }, function($__m) {
      RootRouter = $__m.RootRouter;
    }, function($__m) {
      Pipeline = $__m.Pipeline;
    }, function($__m) {
      bind = $__m.bind;
    }, function($__m) {
      Router = $__m.Router;
    }, function($__m) {
      PipeRegistry = $__m.PipeRegistry;
    }, function($__m) {
      App = $__m.App;
    }, function($__m) {
      pipes = $__m.pipes;
    }],
    execute: function() {
      bootstrap(App, [bind(Router).toValue(new RootRouter(new Pipeline())), bind(PipeRegistry).toValue(new PipeRegistry(pipes))]);
    }
  };
});
