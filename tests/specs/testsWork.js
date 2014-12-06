describe('Basic: tests work', function () {

    it('tests start', function () {
        expect(true).toBe(true);
    });

    it('async tests support', function (done) {
        setTimeout(function () {
            expect(true).toBe(true);
            done();
        }, 100);
    });

});