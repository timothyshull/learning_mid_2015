/*global define */
define(["jasmine"],
    function () {
        function isNimble() {
            return true;
        }

        var canFly = function () {
            return true;
        };

        window.isDeadly = function () {
            return true;
        };

        function outer() {
            it("tests that inner() is in scope before the declaration", function () {
                expect(typeof inner).toBe("function");
            });

            function inner() {
            }

            it("tests that inner() is in scope after the declaration", function () {
                expect(typeof inner).toBe("function");
            });

            it("tests that inner() is not in the outer's containing scope", function () {
                expect(this.inner).toBe(undefined);
            });
        }

        window.wieldSword = function swingsSword() {
            return true;
        };

        return {
            isNimble: isNimble,
            canFly: canFly,
            outer: outer
        };
    }
);