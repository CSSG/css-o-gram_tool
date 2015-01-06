describe('DL.getObjectLength()', function () {

    it('is define', function () {
        expect(DL.getObjectLength).toBeDefined();
    });

    it('is function', function () {
        expect(DL.getObjectLength).toEqual(jasmine.any(Function));
    });

    it('correct for empty object', function () {
        expect(DL.getObjectLength({})).toBe(0);
    });

    it('correct for object with 2 properties', function () {
        expect(DL.getObjectLength({
            firstName: 'Ivan',
            lastName: 'Ivanov'
        })).toBe(2);
    });

});