describe('processingCommentClose (DTesting.exports.simpleDOM.parse.processings)', function () {
    var simpleDOMNodes = DTesting.global.simpleDOM.nodes;
    var parseExports = DTesting.exports.simpleDOM.parse;
    var statesExports = parseExports.states;
    var ContextOfParse = parseExports.ContextOfParse;
    var processings = parseExports.processings;
    var processingCommentClose = processings.processingCommentClose,
        processingCommentEnd = processings.processingCommentEnd,
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
            processingCommentEnd(contextOfParse, '-');
            processingCommentClose(contextOfParse, 'b');

            it('contextOfParse.state is COMMENT_BODY', function () {
                expect(contextOfParse.state).toBe(statesExports.COMMENT_BODY);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('<!--a--b');
            });

            it('contextOfParse.commentBuffer is correct', function () {
                expect(contextOfParse.commentBuffer).toBe('a--b');
            });


        });

        describe('to TEXT', function () {
            var contextOfParse = new ContextOfParse();
            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, '!');
            processingDeclarationStart(contextOfParse, '-');
            processingCommentStart(contextOfParse, '-');
            processingCommentBody(contextOfParse, 'a');
            processingCommentBody(contextOfParse, '-');
            processingCommentEnd(contextOfParse, '-');
            processingCommentClose(contextOfParse, '>');

            it('contextOfParse.state is TEXT', function () {
                expect(contextOfParse.state).toBe(statesExports.TEXT);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('');
            });

            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.textBuffer).toBe('');
            });

            describe('Comment', function () {
                var comment = contextOfParse.result.childNodes[0];

                it('is define', function () {
                    expect(comment).toBeDefined();
                });

                it('is comment', function () {
                    expect(comment instanceof simpleDOMNodes.Comment).toBeTruthy();
                });

                it('comment.text is correct', function () {
                    expect(comment.text).toBe('a');
                });
            });

        });


    });

});