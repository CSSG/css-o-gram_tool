describe('DTesting: exports', function () {
    it('it\'s works', function (done) {
        (function () {
            /*@DTesting.exports*/

            DL.getObjectSafely(DTesting.exports, 'exportsNamespace', 'subsection').privateFunctionForCheckTrue = function (verifiable) {
                return verifiable === true;
            };

            /*@/DTesting.exports*/

        } ());
        setTimeout(function () {
            expect(DTesting.exports.exportsNamespace.subsection.privateFunctionForCheckTrue(true)).toBe(true);
            done();
        }, 10);

    });
});