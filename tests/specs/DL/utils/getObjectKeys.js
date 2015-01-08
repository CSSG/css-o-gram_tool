describe('DL.getObjectKeys()', function () {
    it('is define', function () {
        expect(DL.getObjectKeys).toBeDefined();
    });
    it('is function', function () {
        expect(DL.getObjectKeys).toEqual(jasmine.any(Function));
    });

    describe('correct for none keys', function () {
        var keys = DL.getObjectKeys({});
        it('keys is array', function () {
            expect(keys).toEqual(jasmine.any(Array));
        });
        it('keys.length is 0', function () {
            expect(keys.length).toBe(0);
        });
    });

    describe('correct for object with 2 properties', function () {
        var object = {
                prop1: 1,
                prop2: 2
            };
        var keys = DL.getObjectKeys(object);
        it('keys.length is 2', function () {
            expect(keys.length).toBe(2);
        });
        it('keys[0] is prop1', function () {
            expect(keys[0]).toBe('prop1');
        });
        it('keys[1] is prop2', function () {
            expect(keys[1]).toBe('prop2');
        });
    });
});