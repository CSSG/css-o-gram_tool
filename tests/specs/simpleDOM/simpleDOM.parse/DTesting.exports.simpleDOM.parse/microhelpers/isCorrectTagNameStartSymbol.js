describe('isCorrectTagNameStartSymbol (DTesting.exports.simpleDOM.parse.microhelpers)', function () {
    var parseExports = DTesting.exports.simpleDOM.parse;
    var isCorrectTagNameStartSymbol = parseExports.microehelpers.isCorrectTagNameStartSymbol;

    it('was exported', function () {
        expect(isCorrectTagNameStartSymbol).toBeDefined();
    });

    it('letter is letter', function () {
        expect(isCorrectTagNameStartSymbol('A')).toBeTruthy();
        expect(isCorrectTagNameStartSymbol('Z')).toBeTruthy();
        expect(isCorrectTagNameStartSymbol('a')).toBeTruthy();
        expect(isCorrectTagNameStartSymbol('z')).toBeTruthy();
        expect(isCorrectTagNameStartSymbol('F')).toBeTruthy();
        expect(isCorrectTagNameStartSymbol('f')).toBeTruthy();
    });
    it('/ is not letter', function () {
        expect(isCorrectTagNameStartSymbol('/')).toBeFalsy();
    });
    it('! is not letter', function () {
        expect(isCorrectTagNameStartSymbol('!')).toBeFalsy();
    });
    it('- is not letter', function () {
        expect(isCorrectTagNameStartSymbol('-')).toBeFalsy();
    });
    it('_ is not letter', function () {
        expect(isCorrectTagNameStartSymbol('_')).toBeFalsy();
    });
    it('\' \' is not letter', function () {
        expect(isCorrectTagNameStartSymbol(' ')).toBeFalsy();
    });
    it('number is not letter', function () {
        expect(isCorrectTagNameStartSymbol('0')).toBeFalsy();
        expect(isCorrectTagNameStartSymbol('1')).toBeFalsy();
        expect(isCorrectTagNameStartSymbol('2')).toBeFalsy();
        expect(isCorrectTagNameStartSymbol('3')).toBeFalsy();
        expect(isCorrectTagNameStartSymbol('4')).toBeFalsy();
        expect(isCorrectTagNameStartSymbol('4')).toBeFalsy();
        expect(isCorrectTagNameStartSymbol('6')).toBeFalsy();
        expect(isCorrectTagNameStartSymbol('7')).toBeFalsy();
        expect(isCorrectTagNameStartSymbol('8')).toBeFalsy();
        expect(isCorrectTagNameStartSymbol('9')).toBeFalsy();
    });

});