describe('white space detect', function () {
    function isWhiteSpaceByChars (char) {
        return (char === ' ')
            || (char === '\n')
            || (char === '\t')
            || (char === '\f')
            || (char === '\r');
    }

    describe('handed testing', function () {
        it('\' \' found', function () {
            expect(isWhiteSpaceByChars(' ')).toBe(true);
        });
        it('\\n found', function () {
            expect(isWhiteSpaceByChars('\n')).toBe(true);
        });
        it('\\t found', function () {
            expect(isWhiteSpaceByChars('\t')).toBe(true);
        });
        it('\\f found', function () {
            expect(isWhiteSpaceByChars('\f')).toBe(true);
        });
        it('\\r found', function () {
            expect(isWhiteSpaceByChars('\r')).toBe(true);
        });

        it('A not found', function () {
            expect(isWhiteSpaceByChars('A')).toBe(false);
        });
        it('. not found', function () {
            expect(isWhiteSpaceByChars('.')).toBe(false);
        });
        it('9 not found', function () {
            expect(isWhiteSpaceByChars('9')).toBe(false);
        });
    });

    var regExp = /\s/;
    function isWhiteSpaceByRegExp (char) {
        return regExp.test(char);
    }

    describe('regexp', function () {

        it('\' \' found', function () {
            expect(isWhiteSpaceByRegExp(' ')).toBe(true);
        });
        it('\\n found', function () {
            expect(isWhiteSpaceByRegExp('\n')).toBe(true);
        });
        it('\\t found', function () {
            expect(isWhiteSpaceByRegExp('\t')).toBe(true);
        });
        it('\\f found', function () {
            expect(isWhiteSpaceByRegExp('\f')).toBe(true);
        });
        it('\\r found', function () {
            expect(isWhiteSpaceByRegExp('\r')).toBe(true);
        });

        it('A not found', function () {
            expect(isWhiteSpaceByRegExp('A')).toBe(false);
        });
        it('. not found', function () {
            expect(isWhiteSpaceByRegExp('.')).toBe(false);
        });
        it('9 not found', function () {
            expect(isWhiteSpaceByRegExp('9')).toBe(false);
        });

    });

    it('regExp faster?', function () {
        var chars = [],
            i,
            size = 100000;

        function random(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function getRandomChar() {
            switch (random(0, 6)) {
                case 0:
                    return 'A';
                case 1:
                    return ' ';
                case 2:
                    return '\r';
                case 3:
                    return '1';
                case 4:
                    return ',';
                case 5:
                    return '\t';
                case 6:
                    return 'D';
            }
        }

        for (i = size; i-- ;) {
            chars.push(getRandomChar());
        }

        var start1 = Date.now();
        chars.forEach(function (char) {
            isWhiteSpaceByChars(char);
        });
        var result1 = Date.now() - start1;

        var start2 = Date.now();
        chars.forEach(function (char) {
            isWhiteSpaceByRegExp(char);
        });
        var result2 = Date.now() - start1;

        expect(result1).toBeLessThan(result2);
    });

});