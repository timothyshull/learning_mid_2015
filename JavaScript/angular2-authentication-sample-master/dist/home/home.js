System.register("home/home", ["angular2/angular2", "../utils/fetch", "angular2/router"], function($__export) {
  "use strict";
  var __moduleName = "home/home";
  var Component,
      View,
      If,
      status,
      text,
      Router,
      Home;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      View = $__m.View;
      If = $__m.If;
    }, function($__m) {
      status = $__m.status;
      text = $__m.text;
    }, function($__m) {
      Router = $__m.Router;
    }],
    execute: function() {
      Home = (function() {
        function Home(router) {
          this.router = router;
          this.jwt = localStorage.getItem('jwt');
          this.decodedJwt = this.jwt && jwt_decode(this.jwt);
        }
        return ($traceurRuntime.createClass)(Home, {
          logout: function() {
            localStorage.removeItem('jwt');
            this.router.parent.navigate('/login');
          },
          callAnonymousApi: function() {
            this._callApi('Anonymous', 'http://localhost:3001/api/random-quote');
          },
          callSecuredApi: function() {
            this._callApi('Secured', 'http://localhost:3001/api/protected/random-quote');
          },
          _callApi: function(type, url) {
            var $__0 = this;
            this.response = null;
            this.api = type;
            fetch(url, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.jwt
              }
            }).then(status).then(text).then((function(response) {
              $__0.response = response;
            })).catch((function(error) {
              $__0.response = error.message;
            }));
          }
        }, {});
      }());
      $__export("Home", Home);
      Object.defineProperty(Home, "annotations", {get: function() {
          return [new Component({selector: 'home'}), new View({
            templateUrl: 'home/home.html',
            directives: [If]
          })];
        }});
      Object.defineProperty(Home, "parameters", {get: function() {
          return [[Router]];
        }});
    }
  };
});
