describe('processingTagAttributeName (DTesting.exports.simpleDOM.parse.processings)', function () {
    var simpleDOMNodes = DTesting.global.simpleDOM.nodes;
    var parseExports = DTesting.exports.simpleDOM.parse;
    var statesExports = parseExports.states;
    var ContextOfParse = parseExports.ContextOfParse;
    var processings = parseExports.processings;
    var processingTagAttributeName = processings.processingTagAttributeName,
        processingTagBody = processings.processingTagBody,
        processingText = processings.processingText,
        processingTagStart = processings.processingTagStart,
        processingTagName = processings.processingTagName;

    it('was exported', function () {
        expect(processingTagAttributeName).toBeDefined();
    });

    describe('change state', function () {
        describe('to TEXT when incorrect symbol', function () {
            var contextOfParse = new ContextOfParse();
            processingText(contextOfParse, 'a');
            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, 'd');
            processingTagName(contextOfParse, 'i');
            processingTagName(contextOfParse, 'v');
            processingTagName(contextOfParse, ' ');
            processingTagBody(contextOfParse, 'a');
            processingTagAttributeName(contextOfParse, '\\');

            it('contextOfParse.state is TEXT', function () {
                expect(contextOfParse.state).toBe(statesExports.TEXT);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('a<div a\\');
            });

            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.textBuffer).toBe('a<div a\\');
            });
        });

        describe('to TAG_ATTRIBUTE_TO_VALUE', function () {
            var contextOfParse = new ContextOfParse();
            processingText(contextOfParse, 'a');
            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, 'd');
            processingTagName(contextOfParse, 'i');
            processingTagName(contextOfParse, 'v');
            processingTagName(contextOfParse, ' ');
            processingTagBody(contextOfParse, 'd');
            processingTagAttributeName(contextOfParse, 'a');
            processingTagAttributeName(contextOfParse, 't');
            processingTagAttributeName(contextOfParse, 'a');
            processingTagAttributeName(contextOfParse, '-');
            processingTagAttributeName(contextOfParse, 'a');
            processingTagAttributeName(contextOfParse, '=');

            it('contextOfParse.state is TAG_ATTRIBUTE_TO_VALUE', function () {
                expect(contextOfParse.state).toBe(statesExports.TAG_ATTRIBUTE_TO_VALUE);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('a<div data-a=');
            });

            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.textBuffer).toBe('a');
            });

            it('contextOfParse.attributeName is correct', function () {
                expect(contextOfParse.attributeName).toBe('data-a');
            });
        });
    });
});