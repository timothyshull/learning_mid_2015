#Simple Module Pattern
#
    - Basic
    (function () {
        //code
    }());
##-not really valuable
        - Basic - object return
        (function () {
            return {};
        }());
##-not really valuable
        - Basic - function return
        (function () {
            return function () {};
        }());
#
    - Namespaced
    var Module = (function () {
        //code
    }());
##
        - Namespaced - object return
        (function () {
            return {};
        }());
###
        - Namespaced method access
        var Module = (function () {
          return {
            publicMethod: function () {
              // code
            }
          };
        })();
###
        var Module = (function () {
          var privateMethod = function () {}; // can be FD, FE, or NFE
          return {
            publicMethod: function () {
              // I can call `privateMethod()` you know...
            },
          };
        })();
##
        - Namespaced - function return
        (function () {
            return function () {};
        }());

#Functions
##declaration
function bar() {
    return 3;
}
##anonymous function expression
var a = function() {
    return 3;
};
##named function expression
var a = function bar() {
    return 3;
};
##self invoking function expression
(function bar() {
    return 3;
})();
##method
var foo = {
    bar: function baz () {
        return 3;
    }
};
##constructor
function Foo () {
    this.bar = 0;
    this.baz = function () {
        return 3;
    };
}
var buzz = new Foo();