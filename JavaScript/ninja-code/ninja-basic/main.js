/*global QUnit, assert, window, resume, document*/
/*jslint eqeq: true*/
window.addEventListener("load", function() {
    "use strict";
// 2.5
    QUnit.test("hello test", function (assert) {
        assert.ok(1 == "1", "Passed!");
    });

    QUnit.test("A test.", function (assert) {
        assert.ok(true, "First assertion completed");
        assert.ok(true, "Second assertion completed");
        assert.ok(true, "Third assertion completed");
    });
    QUnit.skip("Another test.", function (assert) {
        assert.ok(true, "First test completed");
        assert.ok(false, "Second test failed");
        assert.ok(true, "Third assertion completed");
    });
    QUnit.skip("A third test.", function (assert) {
        assert.ok(null, "fail");
        assert.ok(5, "pass");
    });

// 2.6
    var queue = [], paused = false, pause, resume, runTest;

    pause = function () {
        paused = true;
    };
    resume = function () {
        paused = false;
        setTimeout(runTest, 1);
    };
    runTest = function () {
        if (!paused && queue.length) {
            (queue.shift())();
            if (!paused) {
                resume();
            }
        }
    };
    QUnit.test("Async Test #1", function (assert) {
        var done = assert.async();
        pause();
        setTimeout(function () {
            assert.ok(true, "First test completed");
            resume();
            done();
        }, 1000);
    });
    QUnit.test("Async Test #2", function (assert) {
        var done = assert.async();
        pause();
        setTimeout(function () {
            assert.ok(true, "Second test completed");
            resume();
            done();
        }, 1000);
    });

    // 3.1
    QUnit.test("Types and props", function (assert) {
        function isNimble() {
            return true;
        }                            //#1

        assert.ok(typeof isNimble === "function",                  //#2
            "isNimble() defined");
        assert.ok(isNimble.name === "isNimble",
            "isNimble() has a name");


        var canFly = function () {
            return true;
        };                       //#3

        assert.ok(typeof canFly === "function",                    //#4
            "canFly() defined");
        assert.ok(canFly.name === "",
            "canFly() has no name");


        window.isDeadly = function () {
            return true;
        };                  //#5

        assert.ok(typeof window.isDeadly === "function",                  //#6
            "isDeadly() defined");

        function outer() {                                              //#7
            assert.ok(typeof inner === "function",
                "inner() in scope before declaration");
            function inner() {
            }

            assert.ok(typeof inner === "function",
                "inner() in scope after declaration");
            assert.ok(window.inner === undefined,
                "inner() not in global scope");
        }

        outer();                                                       //#8
        assert.ok(window.inner === undefined,
            "inner() still not in global scope");

        window.wieldsSword = function swingsSword() {
            return true;
        };  //#9

        assert.ok(window.wieldsSword.name === 'swingsSword',
            "wieldSword's real name is swingsSword");
    });
});