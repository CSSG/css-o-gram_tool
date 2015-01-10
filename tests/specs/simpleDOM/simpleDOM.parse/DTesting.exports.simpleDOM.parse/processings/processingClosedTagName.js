describe('processingClosedTagName (DTesting.exports.simpleDOM.parse.processings)', function () {
    var simpleDOMNodes = DTesting.global.simpleDOM.nodes;
    var parseExports = DTesting.exports.simpleDOM.parse;
    var statesExports = parseExports.states;
    var ContextOfParse = parseExports.ContextOfParse;
    var processings = parseExports.processings;
    var processingClosedTagName = processings.processingClosedTagName,
        processingClosedTagStart = processings.processingClosedTagStart,
        processingText = processings.processingText,
        processingTagStart = processings.processingTagStart,
        processingTagName = processings.processingTagName;

    it('was exported', function () {
        expect(processingClosedTagName).toBeDefined();
    });

    describe('change state', function () {
        describe('to TEXT when incorrect symbol', function () {
            var contextOfParse = new ContextOfParse();

            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, '/');
            processingClosedTagStart(contextOfParse, 'a');
            processingClosedTagName(contextOfParse, ';');

            it('contextOfParse.state is TEXT', function () {
                expect(contextOfParse.state).toBe(statesExports.TEXT);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('</a;');
            });

            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.textBuffer).toBe('</a;');
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
            processingClosedTagName(contextOfParse, '>');

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

        describe('to CLOSED_TAG_BODY', function () {
            var contextOfParse = new ContextOfParse();

            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, '/');
            processingClosedTagStart(contextOfParse, 'd');
            processingClosedTagName(contextOfParse, 'i');
            processingClosedTagName(contextOfParse, 'v');
            processingClosedTagName(contextOfParse, ' ');

            it('contextOfParse.state is CLOSED_TAG_BODY', function () {
                expect(contextOfParse.state).toBe(statesExports.CLOSED_TAG_BODY);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('</div ');
            });

            it('contextOfParse.tagName is correct', function () {
                expect(contextOfParse.tagName).toBe('div');
            });
        });

    });
});