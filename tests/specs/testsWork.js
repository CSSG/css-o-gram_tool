describe('Basic: tests work', function () {

    it('tests start', function () {
        expect(true).toBeTruthy();
    });

    it('async tests support', function (done) {
        setTimeout(function () {
            expect(true).toBeTruthy();
            done();
        }, 1);
    });

});