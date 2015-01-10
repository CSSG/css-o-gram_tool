describe('processingCommentEnd (DTesting.exports.simpleDOM.parse.processings)', function () {
    var simpleDOMNodes = DTesting.global.simpleDOM.nodes;
    var parseExports = DTesting.exports.simpleDOM.parse;
    var statesExports = parseExports.states;
    var ContextOfParse = parseExports.ContextOfParse;
    var processings = parseExports.processings;
    var processingCommentEnd = processings.processingCommentEnd,
        processingCommentBody = processings.processingCommentBody,
        processingCommentStart = processings.processingCommentStart,
        processingDeclarationStart = processings.processingDeclarationStart,
        processingText = processings.processingText,
        processingTagStart = processings.processingTagStart;

    it('is define', function () {
        expect(processingCommentEnd).toBeDefined();
    });

    describe('change state', function () {

        describe('to COMMENT_BODY', function () {
            var contextOfParse = new ContextOfParse();
            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, '!');
            processingDeclarationStart(contextOfParse, '-');
            processingCommentStart(contextOfParse, '-');
            processingCommentBody(contextOfParse, 'a');
            processingCommentBody(contextOfParse, '-');
            processingCommentEnd(contextOfParse, ' ');

            it('contextOfParse.state is COMMENT_BODY', function () {
                expect(contextOfParse.state).toBe(statesExports.COMMENT_BODY);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('<!--a- ');
            });

            it('contextOfParse.commentBuffer is correct', function () {
                expect(contextOfParse.commentBuffer).toBe('a- ');
            });


        });

        describe('to COMMENT_CLOSE', function () {
            var contextOfParse = new ContextOfParse();
            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, '!');
            processingDeclarationStart(contextOfParse, '-');
            processingCommentStart(contextOfParse, '-');
            processingCommentBody(contextOfParse, 'a');
            processingCommentBody(contextOfParse, '-');
            processingCommentEnd(contextOfParse, '-');

            it('contextOfParse.state is COMMENT_CLOSE', function () {
                expect(contextOfParse.state).toBe(statesExports.COMMENT_CLOSE);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('<!--a--');
            });

            it('contextOfParse.commentBuffer is correct', function () {
                expect(contextOfParse.commentBuffer).toBe('a');
            });

        });


    });

});