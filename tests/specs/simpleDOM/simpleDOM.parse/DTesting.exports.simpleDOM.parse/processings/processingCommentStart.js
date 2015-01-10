describe('processingCommentStart (DTesting.exports.simpleDOM.parse.processings)', function () {
    var simpleDOMNodes = DTesting.global.simpleDOM.nodes;
    var parseExports = DTesting.exports.simpleDOM.parse;
    var statesExports = parseExports.states;
    var ContextOfParse = parseExports.ContextOfParse;
    var processings = parseExports.processings;
    var processingCommentStart = processings.processingCommentStart,
        processingDeclarationStart = processings.processingDeclarationStart,
        processingText = processings.processingText,
        processingTagStart = processings.processingTagStart;

    it('is define', function () {
        expect(processingCommentStart).toBeDefined();
    });

    describe('change state', function () {

        describe('to TEXT', function () {
            var contextOfParse = new ContextOfParse();
            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, '!');
            processingDeclarationStart(contextOfParse, '-');
            processingCommentStart(contextOfParse, ' ');

            it('contextOfParse.state is TEXT', function () {
                expect(contextOfParse.state).toBe(statesExports.TEXT);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('<!- ');
            });

            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.textBuffer).toBe('<!- ');
            });

        });

        describe('to COMMENT_BODY', function () {
            var contextOfParse = new ContextOfParse();
            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, '!');
            processingDeclarationStart(contextOfParse, '-');
            processingCommentStart(contextOfParse, '-');

            it('contextOfParse.state is COMMENT_BODY', function () {
                expect(contextOfParse.state).toBe(statesExports.COMMENT_BODY);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('<!--');
            });

            it('contextOfParse.commentBuffer is correct', function () {
                expect(contextOfParse.commentBuffer).toBe('');
            });

        });

    });

});