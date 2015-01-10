describe('isCorrectAttributeNameStartSymbol (DTesting.exports.simpleDOM.parse.microhelpers)', function () {
    var parseExports = DTesting.exports.simpleDOM.parse;
    var isCorrectAttributeNameStartSymbol = parseExports.microehelpers.isCorrectAttributeNameStartSymbol;

    it('was exported', function () {
        expect(isCorrectAttributeNameStartSymbol).toBeDefined();
    });

    it('is isCorrectTagNameStartSymbol', function () {
        expect(isCorrectAttributeNameStartSymbol).toBe(parseExports.microehelpers.isCorrectTagNameStartSymbol);
    })
});