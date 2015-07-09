System.register("login/login", ["angular2/angular2", "../utils/fetch", "angular2/router"], function($__export) {
  "use strict";
  var __moduleName = "login/login";
  var Component,
      View,
      status,
      json,
      Router,
      RouterLink,
      Login;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      View = $__m.View;
    }, function($__m) {
      status = $__m.status;
      json = $__m.json;
    }, function($__m) {
      Router = $__m.Router;
      RouterLink = $__m.RouterLink;
    }],
    execute: function() {
      Login = (function() {
        function Login(router) {
          this.router = router;
        }
        return ($traceurRuntime.createClass)(Login, {
          login: function(event, username, password) {
            var $__0 = this;
            event.preventDefault();
            fetch('http://localhost:3001/sessions/create', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: username,
                password: password
              })
            }).then(status).then(json).then((function(response) {
              localStorage.setItem('jwt', response.id_token);
              $__0.router.parent.navigate('/home');
            })).catch((function(error) {
              alert(error.message);
              console.log(error.message);
            }));
          },
          signup: function(event) {
            event.preventDefault();
            this.router.parent.navigate('/signup');
          }
        }, {});
      }());
      $__export("Login", Login);
      Object.defineProperty(Login, "annotations", {get: function() {
          return [new Component({selector: 'login'}), new View({
            templateUrl: 'login/login.html',
            directives: [RouterLink]
          })];
        }});
      Object.defineProperty(Login, "parameters", {get: function() {
          return [[Router]];
        }});
    }
  };
});
