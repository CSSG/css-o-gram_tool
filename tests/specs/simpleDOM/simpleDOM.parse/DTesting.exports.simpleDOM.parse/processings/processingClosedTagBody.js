describe('processingClosedTagBody (DTesting.exports.simpleDOM.parse.processings)', function () {
    var simpleDOMNodes = DTesting.global.simpleDOM.nodes;
    var parseExports = DTesting.exports.simpleDOM.parse;
    var statesExports = parseExports.states;
    var ContextOfParse = parseExports.ContextOfParse;
    var processings = parseExports.processings;
    var processingClosedTagBody = processings.processingClosedTagBody,
        processingClosedTagName = processings.processingClosedTagName,
        processingClosedTagStart = processings.processingClosedTagStart,
        processingText = processings.processingText,
        processingTagStart = processings.processingTagStart,
        processingTagName = processings.processingTagName;

    it('was exported', function () {
        expect(processingClosedTagBody).toBeDefined();
    });

    describe('change state', function () {
        describe('to TEXT when incorrect symbol', function () {
            var contextOfParse = new ContextOfParse();

            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, '/');
            processingClosedTagStart(contextOfParse, 'a');
            processingClosedTagName(contextOfParse, ' ');
            processingClosedTagBody(contextOfParse, 'a');

            it('contextOfParse.state is TEXT', function () {
                expect(contextOfParse.state).toBe(statesExports.TEXT);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('</a a');
            });

            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.textBuffer).toBe('</a a');
            });


        });
        describe('to TEXT when \'>\' after name', function () {
            var contextOfParse = new ContextOfParse();

            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, 'd');
            processingTagName(contextOfParse, 'i');
            processingTagName(contextOfParse, 'v');
            processingTagName(contextOfParse, '>');
            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, '/');
            processingClosedTagStart(contextOfParse, 'd');
            processingClosedTagName(contextOfParse, 'i');
            processingClosedTagName(contextOfParse, 'v');
            processingClosedTagName(contextOfParse, ' ');
            processingClosedTagBody(contextOfParse, '>');

            it('contextOfParse.state is TEXT', function () {
                expect(contextOfParse.state).toBe(statesExports.TEXT);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('');
            });

            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.buffer).toBe('');
            });

            it('contextOfParse.treeStack is correct', function () {
                var treeStack = contextOfParse.treeStack;
                expect(treeStack.length).toBe(1);
            });

        });


    });
});