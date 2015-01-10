describe('processingTagBody (DTesting.exports.simpleDOM.parse.processings)', function () {
    var simpleDOMNodes = DTesting.global.simpleDOM.nodes;
    var parseExports = DTesting.exports.simpleDOM.parse;
    var statesExports = parseExports.states;
    var ContextOfParse = parseExports.ContextOfParse;
    var processings = parseExports.processings;
    var processingTagBody = processings.processingTagBody,
        processingText = processings.processingText,
        processingTagStart = processings.processingTagStart,
        processingTagName = processings.processingTagName;

    it('was exported', function () {
        expect(processingTagBody).toBeDefined();
    });

    describe('change state', function () {

        describe('to TEXT when incorrect tag body symbol', function () {
            var contextOfParse = new ContextOfParse();
            processingText(contextOfParse, 'a');
            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, 'd');
            processingTagName(contextOfParse, 'i');
            processingTagName(contextOfParse, 'v');
            processingTagName(contextOfParse, ' ');
            processingTagBody(contextOfParse, '\\');

            it('contextOfParse.state is TEXT', function () {
                expect(contextOfParse.state).toBe(statesExports.TEXT);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('a<div \\');
            });

            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.textBuffer).toBe('a<div \\');
            });

        });

        describe('to TEXT when symbol is \'>\'', function () {
            var contextOfParse = new ContextOfParse();
            processingText(contextOfParse, 'a');
            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, 'd');
            processingTagName(contextOfParse, 'i');
            processingTagName(contextOfParse, 'v');
            processingTagName(contextOfParse, '\t');
            processingTagBody(contextOfParse, '>');

            it('contextOfParse.state is TEXT', function () {
                expect(contextOfParse.state).toBe(statesExports.TEXT);
            });
            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('');
            });
            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.textBuffer).toBe('');
            });

            describe('textNode', function () {
                var textNode = contextOfParse.result.childNodes[0];
                it('is define', function () {
                    expect(textNode).toBeDefined();
                });
                it('is TextNode', function () {
                    expect(textNode instanceof simpleDOMNodes.Text).toBeTruthy();
                });
                it('correct textNode.text', function () {
                    expect(textNode.text).toBe('a');
                });
            });

            describe('tag', function () {
                var tag = contextOfParse.result.childNodes[1];
                it('is define', function () {
                    expect(tag).toBeDefined();
                });
                it('is TextNode', function () {
                    expect(tag instanceof simpleDOMNodes.Tag).toBeTruthy();
                });
                it('correct textNode.text', function () {
                    expect(tag.name).toBe('div');
                });
                it('add to contextOfParse.treeStack', function () {
                    var treeStack = contextOfParse.treeStack,
                        contextOfParseResult = contextOfParse.result;
                    expect(treeStack.length).toBe(2);
                    expect(treeStack[0]).toBe(contextOfParseResult);
                    expect(treeStack[1]).toBe(contextOfParseResult.childNodes[1]);
                });
            });

        });

        describe('to TAG_CLOSE', function () {
            var contextOfParse = new ContextOfParse();
            processingText(contextOfParse, 'a');
            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, 'd');
            processingTagName(contextOfParse, 'i');
            processingTagName(contextOfParse, 'v');
            processingTagName(contextOfParse, '\r');
            processingTagBody(contextOfParse, '/');

            it('contextOfParse.state is TAG_CLOSE', function () {
                expect(contextOfParse.state).toBe(statesExports.TAG_CLOSE);
            });
            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('a<div\r/');
            });
            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.textBuffer).toBe('a');
            });
            it('contextOfParse.tagName is correct', function () {
                expect(contextOfParse.tagName).toBe('div');
            });
        });

        describe('to TAG_ATTRIBUTE_NAME', function () {
            var contextOfParse = new ContextOfParse();
            processingText(contextOfParse, 'a');
            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, 'd');
            processingTagName(contextOfParse, 'i');
            processingTagName(contextOfParse, 'v');
            processingTagName(contextOfParse, ' ');
            processingTagBody(contextOfParse, '\n');
            processingTagBody(contextOfParse, 'a');

            it('contextOfParse.state is TAG_ATTRIBUTE_NAME', function () {
                expect(contextOfParse.state).toBe(statesExports.TAG_ATTRIBUTE_NAME);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('a<div \na');
            });

            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.textBuffer).toBe('a');
            });

            it('contextOfParse.tagName is correct', function () {
                expect(contextOfParse.tagName).toBe('div');
            });

            it('contextOfParse.attributeName is correct', function () {
                expect(contextOfParse.attributeName).toBe('a');
            });



        });

    });

});