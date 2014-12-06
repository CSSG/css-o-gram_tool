describe('research: Java Script types interaction', function () {
    it('Array instance of Object', function () {
        expect([] instanceof Object).toBe(true);
    });

    it('String not instance of Object', function () {
        expect('' instanceof Object).toBe(false);
    });
});