/*global define */
define(
    function () {
        "use strict";
        function Constructor1() {
            this.property1 = [0, 1, 2, 3];
            this.property2 = "string";
        }

        Constructor1.prototype = {
            method1: function () {
                this.property1 = this.property1.map(function (elem) {
                    return elem * 2;
                });
            },
            method2: function (newString) {
                this.property2 = this.property2 + newString;
            }
        };

        return Constructor1;
    }
);