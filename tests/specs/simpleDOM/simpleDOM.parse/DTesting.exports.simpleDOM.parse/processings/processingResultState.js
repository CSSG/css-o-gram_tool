describe('processingResultState (DTesting.exports.simpleDOM.parse.processings)', function () {
    var simpleDOMNodes = DTesting.global.simpleDOM.nodes;
    var parseExports = DTesting.exports.simpleDOM.parse;
    var ContextOfParse = parseExports.ContextOfParse;
    var processings = parseExports.processings;

    var processingResultState = processings.processingResultState,
        processingText = processings.processingText,
        processingTagStart = processings.processingTagStart,
        processingTagName = processings.processingTagName,
        processingDeclarationStart = processings.processingDeclarationStart,
        processingCommentBody = processings.processingCommentBody,
        processingCommentStart = processings.processingCommentStart;

    it('is define', function () {
        expect(processingResultState).toBeDefined();
    });

    describe('when TEXT', function () {
        var contextOfParse = new ContextOfParse();
        processingText(contextOfParse, 'h');
        processingText(contextOfParse, 'e');
        processingText(contextOfParse, 'l');
        processingText(contextOfParse, 'l');
        processingText(contextOfParse, 'o');
        processingResultState(contextOfParse);

        describe('correct result', function () {
            var resultFragmentChildNodes = contextOfParse.result.childNodes;

            it('childNodes length is correct', function () {
                expect(resultFragmentChildNodes.length).toBe(1);
            });

            describe('textNode', function () {
                var textNode = resultFragmentChildNodes[0];

                it('is define', function () {
                    expect(textNode).toBeDefined();
                });

                it('is Text', function () {
                    expect(textNode instanceof simpleDOMNodes.Text).toBe(true);
                });

                it('textNode.text is correct', function () {
                    expect(textNode.text).toBe('hello');
                });

            });
        });

    });

    describe('when in tag', function () {
        var contextOfParse = new ContextOfParse();
        processingText(contextOfParse, 'a');
        processingText(contextOfParse, '<');
        processingTagStart(contextOfParse, 'd');
        processingTagName(contextOfParse, 'i');
        processingTagName(contextOfParse, 'v');
        processingResultState(contextOfParse);

        describe('correct result', function () {
            var resultFragmentChildNodes = contextOfParse.result.childNodes;

            it('childNodes length is correct', function () {
                expect(resultFragmentChildNodes.length).toBe(1);
            });

            describe('textNode', function () {
                var textNode = resultFragmentChildNodes[0];

                it('is define', function () {
                    expect(textNode).toBeDefined();
                });

                it('is Text', function () {
                    expect(textNode instanceof simpleDOMNodes.Text).toBe(true);
                });

                it('textNode.text is correct', function () {
                    expect(textNode.text).toBe('a<div');
                });

            });
        });

    });

    describe('when in comment', function () {
        var contextOfParse = new ContextOfParse();
        processingText(contextOfParse, 'a');
        processingText(contextOfParse, '<');
        processingTagStart(contextOfParse, '!');
        processingDeclarationStart(contextOfParse, '-');
        processingCommentStart(contextOfParse, '-');
        processingCommentBody(contextOfParse, 'b');
        processingResultState(contextOfParse);

        describe('correct result', function () {
            var resultFragmentChildNodes = contextOfParse.result.childNodes;

            it('childNodes length is correct', function () {
                expect(resultFragmentChildNodes.length).toBe(1);
            });

            describe('textNode', function () {
                var textNode = resultFragmentChildNodes[0];

                it('is define', function () {
                    expect(textNode).toBeDefined();
                });

                it('is Text', function () {
                    expect(textNode instanceof simpleDOMNodes.Text).toBe(true);
                });

                it('textNode.text is correct', function () {
                    expect(textNode.text).toBe('a<!--b');
                });

            });
        });

    });




});