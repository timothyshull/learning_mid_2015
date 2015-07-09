describe("Asynchronous specs", function() {
    var value;

    beforeEach(function(done) {
        setTimeout(function() {
            value = 0;
            done();
        }, 1);
    });

    it("should support async execution of test preparation and expectations", function(done) {
        value++;
        expect(value).toBeGreaterThan(0);
        done();
    });
});

describe("Asynchronous specs", function() {
    var value;

    beforeEach(function(done) {
        setTimeout(function() {
            value = 0;
            done();
        }, 1);
    });

    it("should support async execution of test preparation and expectations", function(done) {
        value++;
        expect(value).toBeGreaterThan(0);
        done();
    });

    describe("long asynchronous specs", function() {
        beforeEach(function(done) {
            done();
        }, 1000);

        it("takes a long time", function(done) {
            setTimeout(function() {
                expect(true).toBe(true);
                done();
            }, 9000);
        }, 10000);

        afterEach(function(done) {
            done();
        }, 1000);
    });
});

