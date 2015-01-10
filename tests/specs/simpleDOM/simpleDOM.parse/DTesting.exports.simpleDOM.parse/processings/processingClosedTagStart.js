describe('processingClosedTagStart (DTesting.exports.simpleDOM.parse.processings)', function () {
    var simpleDOMNodes = DTesting.global.simpleDOM.nodes;
    var parseExports = DTesting.exports.simpleDOM.parse;
    var statesExports = parseExports.states;
    var ContextOfParse = parseExports.ContextOfParse;
    var processings = parseExports.processings;
    var processingClosedTagStart = processings.processingClosedTagStart,
        processingText = processings.processingText,
        processingTagStart = processings.processingTagStart;

    it('was exported', function () {
        expect(processingClosedTagStart).toBeDefined();
    });

    describe('change state', function () {
        describe('to TEXT when incorrect symbol', function () {
            var contextOfParse = new ContextOfParse();

            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, '/');
            processingClosedTagStart(contextOfParse, ' ');

            it('contextOfParse.state is TEXT', function () {
                expect(contextOfParse.state).toBe(statesExports.TEXT);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('</ ');
            });

            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.textBuffer).toBe('</ ');
            });


        });
        describe('to CLOSED_TAG_NAME', function () {
            var contextOfParse = new ContextOfParse();

            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, '/');
            processingClosedTagStart(contextOfParse, 'a');

            it('contextOfParse.state is CLOSED_TAG_NAME', function () {
                expect(contextOfParse.state).toBe(statesExports.CLOSED_TAG_NAME);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('</a');
            });

            it('contextOfParse.tagName is correct', function () {
                expect(contextOfParse.tagName).toBe('a');
            });
        });
    });
});