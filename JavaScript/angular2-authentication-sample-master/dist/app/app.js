System.register("app/app", ["angular2/angular2", "../home/home", "../login/login", "../signup/signup", "angular2/router", "./LoggedInOutlet"], function($__export) {
  "use strict";
  var __moduleName = "app/app";
  var View,
      Component,
      Home,
      Login,
      Signup,
      Router,
      LoggedInOutlet,
      App;
  return {
    setters: [function($__m) {
      View = $__m.View;
      Component = $__m.Component;
    }, function($__m) {
      Home = $__m.Home;
    }, function($__m) {
      Login = $__m.Login;
    }, function($__m) {
      Signup = $__m.Signup;
    }, function($__m) {
      Router = $__m.Router;
    }, function($__m) {
      LoggedInOutlet = $__m.LoggedInOutlet;
    }],
    execute: function() {
      App = (function() {
        function App(router) {
          this.router = router;
          router.config('/home', Home).then((function(_) {
            return router.config('/login', Login, 'login');
          })).then((function(_) {
            return router.config('/signup', Signup, 'signup');
          })).then((function(_) {
            return router.navigate('/home');
          }));
        }
        return ($traceurRuntime.createClass)(App, {goTo: function(event, url) {
            event.preventDefault();
            this.router.navigate(url).then((function() {
              console.log("Router successfully to", url);
            }), (function() {
              console.log("Error going to URL", url);
            }));
          }}, {});
      }());
      $__export("App", App);
      Object.defineProperty(App, "annotations", {get: function() {
          return [new Component({selector: 'auth-app'}), new View({
            templateUrl: 'app/app.html',
            directives: [LoggedInOutlet]
          })];
        }});
      Object.defineProperty(App, "parameters", {get: function() {
          return [[Router]];
        }});
    }
  };
});
