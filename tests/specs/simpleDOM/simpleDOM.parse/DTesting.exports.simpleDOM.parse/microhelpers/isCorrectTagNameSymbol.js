describe('isCorrectTagNameSymbol (DTesting.exports.simpleDOM.parse.microhelpers)', function () {
    var parseExports = DTesting.exports.simpleDOM.parse;
    var isCorrectTagNameSymbol = parseExports.microehelpers.isCorrectTagNameSymbol;

    it('was exported', function () {
        expect(isCorrectTagNameSymbol).toBeDefined();
    });

    it('letter is correct', function () {
        expect(isCorrectTagNameSymbol('A')).toBeTruthy();
        expect(isCorrectTagNameSymbol('Z')).toBeTruthy();
        expect(isCorrectTagNameSymbol('a')).toBeTruthy();
        expect(isCorrectTagNameSymbol('z')).toBeTruthy();
        expect(isCorrectTagNameSymbol('F')).toBeTruthy();
        expect(isCorrectTagNameSymbol('f')).toBeTruthy();
    });
    it('/ is not correct', function () {
        expect(isCorrectTagNameSymbol('/')).toBeFalsy();
    });
    it('! is not correct', function () {
        expect(isCorrectTagNameSymbol('!')).toBeFalsy();
    });
    it('\' \' is not correct', function () {
        expect(isCorrectTagNameSymbol(' ')).toBeFalsy();
    });
    it('- is correct', function () {
        expect(isCorrectTagNameSymbol('-')).toBeTruthy();
    });
    it('_ is correct', function () {
        expect(isCorrectTagNameSymbol('_')).toBeTruthy();
    });
    it('number is correct', function () {
        expect(isCorrectTagNameSymbol('0')).toBeTruthy();
        expect(isCorrectTagNameSymbol('1')).toBeTruthy();
        expect(isCorrectTagNameSymbol('2')).toBeTruthy();
        expect(isCorrectTagNameSymbol('3')).toBeTruthy();
        expect(isCorrectTagNameSymbol('4')).toBeTruthy();
        expect(isCorrectTagNameSymbol('4')).toBeTruthy();
        expect(isCorrectTagNameSymbol('6')).toBeTruthy();
        expect(isCorrectTagNameSymbol('7')).toBeTruthy();
        expect(isCorrectTagNameSymbol('8')).toBeTruthy();
        expect(isCorrectTagNameSymbol('9')).toBeTruthy();
    });
});