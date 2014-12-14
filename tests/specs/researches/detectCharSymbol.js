describe('research: Detect char symbol', function () {

    describe('Comparison operators', function () {

        describe('range check?', function () {
            it('d > a && d < z', function () {
                expect(('d' > 'a') && ('d' < 'z')).toBe(true);
            });

            it('D > a && D < z', function () {
                expect(('D' > 'a') && ('D' < 'z')).toBe(false);
            });

            it('D > A && D < Z', function () {
                expect(('D' > 'A') && ('D' < 'Z')).toBe(true);
            });

            it('d > A && d < Z', function () {
                expect(('d' > 'A') && ('d' < 'Z')).toBe(false);
            });
        });


        function isLetterByRange (char) {
            return (char > 'a') && (char < 'z')
                || (char > 'A') && (char < 'Z');
        }

        var reg = /[A-Za-z]/;
        function isLetterByRegExp (char) {
            return reg.test(char);
        }

        describe('handles range check', function () {
            it('D is letter', function () {
                expect(isLetterByRange('D')).toBe(true);
            });

            it('1 is not letter', function () {
                expect(isLetterByRange('1')).toBe(false);
            });

            it('. is not letter', function () {
                expect(isLetterByRange('.')).toBe(false);
            });
        });

        describe('RegExp checks', function () {
            it('D is letter by regExp', function () {
                expect(isLetterByRegExp('D')).toBe(true);
            });

            it('1 is not letter by regExp', function () {
                expect(isLetterByRegExp('1')).toBe(false);
            });

            it('. is not letter by regExp', function () {
                expect(isLetterByRegExp('.')).toBe(false);
            });

            it('A is letter by regExp', function () {
                expect(isLetterByRegExp('A')).toBe(true);
            });
        });



        it('regExp faster', function () {
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
                        return 'w';
                    case 2:
                        return 'F';
                    case 3:
                        return '1';
                    case 4:
                        return ',';
                    case 5:
                        return 'u';
                    case 6:
                        return 'D';
                }
            }

            for (i = size; i-- ;) {
                chars.push(getRandomChar());
            }

            var start1 = Date.now();
            chars.forEach(function (char) {
                isLetterByRange(char);
            });
            var result1 = Date.now() - start1;

            var start2 = Date.now();
            chars.forEach(function (char) {
                isLetterByRegExp(char);
            });
            var result2 = Date.now() - start1;

            expect(result1).toBeLessThan(result2);

        });

    });

});