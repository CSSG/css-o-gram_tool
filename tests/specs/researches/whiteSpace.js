describe('research: white space detect', function () {
    function isWhiteSpaceByChars (char) {
        return (char === ' ')
            || (char === '\n')
            || (char === '\t')
            || (char === '\f')
            || (char === '\r');
    }

    describe('handed testing', function () {
        it('\' \' found', function () {
            expect(isWhiteSpaceByChars(' ')).toBeTruthy();
        });
        it('\\n found', function () {
            expect(isWhiteSpaceByChars('\n')).toBeTruthy();
        });
        it('\\t found', function () {
            expect(isWhiteSpaceByChars('\t')).toBeTruthy();
        });
        it('\\f found', function () {
            expect(isWhiteSpaceByChars('\f')).toBeTruthy();
        });
        it('\\r found', function () {
            expect(isWhiteSpaceByChars('\r')).toBeTruthy();
        });

        it('A not found', function () {
            expect(isWhiteSpaceByChars('A')).toBeFalsy();
        });
        it('. not found', function () {
            expect(isWhiteSpaceByChars('.')).toBeFalsy();
        });
        it('9 not found', function () {
            expect(isWhiteSpaceByChars('9')).toBeFalsy();
        });
    });

    var regExp = /\s/;
    function isWhiteSpaceByRegExp (char) {
        return regExp.test(char);
    }

    describe('regexp', function () {

        it('\' \' found', function () {
            expect(isWhiteSpaceByRegExp(' ')).toBeTruthy();
        });
        it('\\n found', function () {
            expect(isWhiteSpaceByRegExp('\n')).toBeTruthy();
        });
        it('\\t found', function () {
            expect(isWhiteSpaceByRegExp('\t')).toBeTruthy();
        });
        it('\\f found', function () {
            expect(isWhiteSpaceByRegExp('\f')).toBeTruthy();
        });
        it('\\r found', function () {
            expect(isWhiteSpaceByRegExp('\r')).toBeTruthy();
        });

        it('A not found', function () {
            expect(isWhiteSpaceByRegExp('A')).toBeFalsy();
        });
        it('. not found', function () {
            expect(isWhiteSpaceByRegExp('.')).toBeFalsy();
        });
        it('9 not found', function () {
            expect(isWhiteSpaceByRegExp('9')).toBeFalsy();
        });

    });

    function isWhiteSpaceByChars2 (char) {
        switch (char){
            case ' ':
            case '\n':
            case '\t':
            case '\f':
            case '\r':
                return true;
        }
        return false;
    }

    describe('handed testing 2', function () {
        it('\' \' found', function () {
            expect(isWhiteSpaceByChars2(' ')).toBeTruthy();
        });
        it('\\n found', function () {
            expect(isWhiteSpaceByChars2('\n')).toBeTruthy();
        });
        it('\\t found', function () {
            expect(isWhiteSpaceByChars2('\t')).toBeTruthy();
        });
        it('\\f found', function () {
            expect(isWhiteSpaceByChars2('\f')).toBeTruthy();
        });
        it('\\r found', function () {
            expect(isWhiteSpaceByChars2('\r')).toBeTruthy();
        });

        it('A not found', function () {
            expect(isWhiteSpaceByChars2('A')).toBeFalsy();
        });
        it('. not found', function () {
            expect(isWhiteSpaceByChars2('.')).toBeFalsy();
        });
        it('9 not found', function () {
            expect(isWhiteSpaceByChars2('9')).toBeFalsy();
        });
    });

    it('regExp faster of handing?', function () {
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

    it('regExp faster of handing2?', function () {
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
            isWhiteSpaceByChars2(char);
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