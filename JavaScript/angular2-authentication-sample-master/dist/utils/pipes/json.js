System.register("utils/pipes/json", ["angular2/change_detection"], function($__export) {
  "use strict";
  var __moduleName = "utils/pipes/json";
  var Pipe,
      JSONPipeFactory;
  return {
    setters: [function($__m) {
      Pipe = $__m.Pipe;
    }],
    execute: function() {
      JSONPipeFactory = (function($__super) {
        function JSONPipeFactory() {
          $traceurRuntime.superConstructor(JSONPipeFactory).apply(this, arguments);
        }
        return ($traceurRuntime.createClass)(JSONPipeFactory, {
          supports: function(obj) {
            return true;
          },
          transform: function(value) {
            return JSON.stringify(value, null, 2);
          },
          create: function() {
            return this;
          }
        }, {}, $__super);
      }(Pipe));
      $__export("JSONPipeFactory", JSONPipeFactory);
    }
  };
});
