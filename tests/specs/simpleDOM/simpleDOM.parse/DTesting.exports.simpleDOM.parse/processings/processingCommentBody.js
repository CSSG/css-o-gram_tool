describe('processingCommentBody (DTesting.exports.simpleDOM.parse.processings)', function () {
    var simpleDOMNodes = DTesting.global.simpleDOM.nodes;
    var parseExports = DTesting.exports.simpleDOM.parse;
    var statesExports = parseExports.states;
    var ContextOfParse = parseExports.ContextOfParse;
    var processings = parseExports.processings;
    var processingCommentBody = processings.processingCommentBody,
        processingCommentStart = processings.processingCommentStart,
        processingDeclarationStart = processings.processingDeclarationStart,
        processingText = processings.processingText,
        processingTagStart = processings.processingTagStart;

    it('is define', function () {
        expect(processingCommentBody).toBeDefined();
    });

    describe('change state', function () {

        describe('to COMMENT_END', function () {
            var contextOfParse = new ContextOfParse();
            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, '!');
            processingDeclarationStart(contextOfParse, '-');
            processingCommentStart(contextOfParse, '-');
            processingCommentBody(contextOfParse, 'a');
            processingCommentBody(contextOfParse, '-');

            it('contextOfParse.state is COMMENT_END', function () {
                expect(contextOfParse.state).toBe(statesExports.COMMENT_END);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('<!--a-');
            });

            it('contextOfParse.commentBuffer is correct', function () {
                expect(contextOfParse.commentBuffer).toBe('a');
            });

            it('contextOfParse.commentToken is correct', function () {
                expect(contextOfParse.commentToken).toBe('-');
            });

        });


    });

});