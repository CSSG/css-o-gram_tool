describe('isCorrectAttributeNameSymbol (DTesting.exports.simpleDOM.parse.microhelpers)', function () {
    var parseExports = DTesting.exports.simpleDOM.parse;
    var isCorrectAttributeNameSymbol = parseExports.microehelpers.isCorrectAttributeNameSymbol;

    it('was exported', function () {
        expect(isCorrectAttributeNameSymbol).toBeDefined();
    });

    it('is isCorrectTagNameStartSymbol', function () {
        expect(isCorrectAttributeNameSymbol).toBe(parseExports.microehelpers.isCorrectTagNameSymbol);
    })
});