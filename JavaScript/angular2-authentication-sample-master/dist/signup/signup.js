System.register("signup/signup", ["angular2/angular2", "../utils/fetch", "angular2/router"], function($__export) {
  "use strict";
  var __moduleName = "signup/signup";
  var Component,
      View,
      status,
      json,
      Router,
      RouterLink,
      Signup;
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
      Signup = (function() {
        function Signup(router) {
          this.router = router;
        }
        return ($traceurRuntime.createClass)(Signup, {
          signup: function(event, username, password) {
            var $__0 = this;
            event.preventDefault();
            fetch('http://localhost:3001/users', {
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
          login: function(event) {
            event.preventDefault();
            this.router.parent.navigate('/login');
          }
        }, {});
      }());
      $__export("Signup", Signup);
      Object.defineProperty(Signup, "annotations", {get: function() {
          return [new Component({selector: 'signup'}), new View({
            templateUrl: 'signup/signup.html',
            directives: [RouterLink]
          })];
        }});
      Object.defineProperty(Signup, "parameters", {get: function() {
          return [[Router]];
        }});
    }
  };
});
