System.register("utils/pipes/pipes", ["angular2/change_detection", "./json"], function($__export) {
  "use strict";
  var __moduleName = "utils/pipes/pipes";
  var defaultPipes,
      JSONPipeFactory,
      pipes;
  return {
    setters: [function($__m) {
      defaultPipes = $__m.defaultPipes;
    }, function($__m) {
      JSONPipeFactory = $__m.JSONPipeFactory;
    }],
    execute: function() {
      pipes = Object.assign({}, defaultPipes, {'json': [new JSONPipeFactory()]});
      $__export("pipes", pipes);
    }
  };
});
