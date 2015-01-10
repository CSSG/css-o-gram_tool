describe('simpleDOM', function () {
    var simpleDOM = DTesting.global.simpleDOM;

    it('is defined', function () {
        expect(simpleDOM).toBeDefined();
    });

    it('is Object', function () {
        expect(simpleDOM).toEqual(jasmine.any(Object));
    });

    describe('parts', function () {

        it('nodes is define', function () {
            expect(simpleDOM.nodes).toBeDefined();
        });

        it('nodes is object', function () {
            expect(simpleDOM.nodes).toEqual(jasmine.any(Object));
        });

        it('helpers is define', function () {
            expect(simpleDOM.helpers).toBeDefined();
        });

        it('helpers is object', function () {
            expect(simpleDOM.helpers).toEqual(jasmine.any(Object));
        });

        it('parse is define', function () {
            expect(simpleDOM.parse).toBeDefined();
        });

        it('parse is function', function () {
            expect(simpleDOM.parse).toEqual(jasmine.any(Function));
        });

    });

});