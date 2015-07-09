System.register("app/LoggedInOutlet", ["angular2/src/facade/async", "angular2/annotations", "angular2/router", "../login/login"], function($__export) {
  "use strict";
  var __moduleName = "app/LoggedInOutlet";
  var PromiseWrapper,
      Decorator,
      RouterOutlet,
      Login,
      LoggedInOutlet;
  return {
    setters: [function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      Decorator = $__m.Decorator;
    }, function($__m) {
      RouterOutlet = $__m.RouterOutlet;
    }, function($__m) {
      Login = $__m.Login;
    }],
    execute: function() {
      LoggedInOutlet = (function($__super) {
        function LoggedInOutlet(viewContainer, compiler, router, injector) {
          $traceurRuntime.superConstructor(LoggedInOutlet).call(this, viewContainer, compiler, router, injector);
          this.publicRoutes = {
            '/login': true,
            '/signup': true
          };
        }
        return ($traceurRuntime.createClass)(LoggedInOutlet, {canActivate: function(instruction) {
            var url = this._router.lastNavigationAttempt;
            if (!this.publicRoutes[url] && !localStorage.getItem('jwt')) {
              instruction.component = Login;
            }
            return PromiseWrapper.resolve(true);
          }}, {}, $__super);
      }(RouterOutlet));
      $__export("LoggedInOutlet", LoggedInOutlet);
      Object.defineProperty(LoggedInOutlet, "annotations", {get: function() {
          return [new Decorator({selector: 'loggedin-router-outlet'})];
        }});
    }
  };
});
