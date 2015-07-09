/*global define, document*/
define(
    [
        "jquery",
        "QUnit"
    ],
    function ($, QUnit) {
        "use strict";
        QUnit.test("A Basic Test", function (assert) {
            //noinspection JSLint
            assert.ok(1 == "1", "Passed!");
        });

        QUnit.test("jQuery add test", function (assert) {
            var testObj1 = $("<div>").add("<p>"),
                testObj2 = $("<div>"),
                testObj3 = $("<p>");
            assert.ok(testObj1.get(0).isEqualNode(testObj2.get(0)), "The first element is a div element");
            assert.ok(testObj1.get(1).isEqualNode(testObj3.get(0)), "The first element is a p element");
        });

        QUnit.test("jQuery focusin", function (assert) {
            var done = assert.async();
            $(".test-input").focusin(function (e) {
                assert.ok(e instanceof Object, "Test that the focusin method triggers an event");
                done();
            });
            document.getElementsByClassName("test-input")[0].focus();
        });

        QUnit.test("jQuery load", function (assert) {
            var done = assert.async();
            $(".test-elem").load("test-doc.json", function () {
                assert.notEqual(document.getElementsByClassName("test-elem")[0].innerHTML, "", "Test that the load function loads a json doc");
                done();
            });
        });

        QUnit.start();
    }
);
