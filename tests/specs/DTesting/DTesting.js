describe('DTesting: main', function () {
    it('DTesting is define', function () {
        expect(window.DTesting).toBeDefined();
    });

    describe('DTesting.utils', function () {
        it('is define', function () {
            expect(DTesting.utils).toBeDefined();
        });
        it('is object', function () {
            expect(DTesting.utils).toEqual(jasmine.any(Object));
        });
    });

    describe('DTesting.exports', function () {
        it('is define', function () {
            expect(DTesting.exports).toBeDefined();
        });
        it('is object', function () {
            expect(DTesting.exports).toEqual(jasmine.any(Object));
        });
    });

});