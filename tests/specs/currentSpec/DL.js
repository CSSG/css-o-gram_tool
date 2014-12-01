describe('Default Lib tests', function () {

    describe('correct define', function () {
        it('is defined', function () {
            expect(window.DL).toBeDefined();
        });

        describe('modules', function () {

            it('cycle is define', function () {
                expect(DL.cycle).toBeDefined();
            });

            it('cycle is function', function () {
                expect(DL.cycle).toEqual(jasmine.any(Function));
            });

        });
    });

});