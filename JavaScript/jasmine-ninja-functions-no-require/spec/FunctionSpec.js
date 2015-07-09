describe("A declaration scope suite", function () {
    describe("it demonstrates where various objects and declarations enter a scope", function () {
        describe("- BEFORE OUTER -", function () {
            it("makes sure true is true", function () {
                expect(true).toBe(true);
            });
            it("tests if outer() is in scope", function () {
                expect(typeof outer).toBe("function");
            });
            xit("tests if inner() is in scope", function () {
                expect(typeof inner).toBe("function");
            });
            xit("tests if a is in scope", function () {
                expect(typeof a).toBe("number");
            });
            xit("tests if b is in scope", function () {
                expect(typeof b).toBe("number");
            });
            xit("tests if c is in scope", function () {
                expect(typeof c).toBe("number");
            });
        });

        function outer() {
            describe("- INSIDE OUTER, BEFORE a -", function () {
                it("makes sure true is true", function () {
                    expect(true).toBe(true);
                });
                it("tests if outer() is in scope", function () {
                    expect(typeof outer).toBe("function");
                });
                it("tests if inner() is in scope", function () {
                    expect(typeof inner).toBe("function");
                });
                it("tests if a is in scope", function () {
                    expect(typeof a).toBe("number");
                });
                it("tests if b is in scope", function () {
                    expect(typeof b).toBe("number");
                });
                it("tests if c is in scope", function () {
                    expect(typeof c).toBe("number");
                });
            });

            var a = 1;

            describe("- INSIDE OUTER, AFTER a -", function () {
                it("makes sure true is true", function () {
                    expect(true).toBe(true);
                });
                it("tests if outer() is in scope", function () {
                    expect(typeof outer).toBe("function");
                });
                it("tests if inner() is in scope", function () {
                    expect(typeof inner).toBe("function");
                });
                it("tests if a is in scope", function () {
                    expect(typeof a).toBe("number");
                });
                it("tests if b is in scope", function () {
                    expect(typeof b).toBe("number");
                });
                it("tests if c is in scope", function () {
                    expect(typeof c).toBe("number");
                });
            });

            function inner() {
            }

            var b = 2;

            describe("- INSIDE OUTER, AFTER inner() and b -", function () {
                it("makes sure true is true", function () {
                    expect(true).toBe(true);
                });
                it("tests if outer() is in scope", function () {
                    expect(typeof outer).toBe("function");
                });
                it("tests if inner() is in scope", function () {
                    expect(typeof inner).toBe("function");
                });
                it("tests if a is in scope", function () {
                    expect(typeof a).toBe("number");
                });
                it("tests if b is in scope", function () {
                    expect(typeof b).toBe("number");
                });
                it("tests if c is in scope", function () {
                    expect(typeof c).toBe("number");
                });
            });

            if (a === 1) {
                var c = 3;

                describe("- INSIDE OUTER, AFTER if -", function () {
                    it("makes sure true is true", function () {
                        expect(true).toBe(true);
                    });
                    it("tests if outer() is in scope", function () {
                        expect(typeof outer).toBe("function");
                    });
                    it("tests if inner() is in scope", function () {
                        expect(typeof inner).toBe("function");
                    });
                    it("tests if a is in scope", function () {
                        expect(typeof a).toBe("number");
                    });
                    it("tests if b is in scope", function () {
                        expect(typeof b).toBe("number");
                    });
                    it("tests if c is in scope", function () {
                        expect(typeof c).toBe("number");
                    });
                });
            }

            describe("- INSIDE OUTER, OUTSIDE if -", function () {
                it("makes sure true is true", function () {
                    expect(true).toBe(true);
                });
                it("tests if outer() is in scope", function () {
                    expect(typeof outer).toBe("function");
                });
                it("tests if inner() is in scope", function () {
                    expect(typeof inner).toBe("function");
                });
                it("tests if a is in scope", function () {
                    expect(typeof a).toBe("number");
                });
                it("tests if b is in scope", function () {
                    expect(typeof b).toBe("number");
                });
                it("tests if c is in scope", function () {
                    expect(typeof c).toBe("number");
                });
            });

        }

        outer();

        describe("- AFTER outer() -", function () {
            it("makes sure true is true", function () {
                expect(true).toBe(true);
            });
            it("tests if outer() is in scope", function () {
                expect(typeof outer).toBe("function");
            });
            xit("tests if inner() is in scope", function () {
                expect(typeof inner).toBe("function");
            });
            xit("tests if a is in scope", function () {
                expect(typeof a).toBe("number");
            });
            xit("tests if b is in scope", function () {
                expect(typeof b).toBe("number");
            });
            xit("tests if c is in scope", function () {
                expect(typeof c).toBe("number");
            });
        });
    });
});
