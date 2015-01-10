describe('processingTagName (DTesting.exports.simpleDOM.parse.processings)', function () {
    var simpleDOMNodes = DTesting.global.simpleDOM.nodes;
    var parseExports = DTesting.exports.simpleDOM.parse;
    var statesExports = parseExports.states;
    var ContextOfParse = parseExports.ContextOfParse;
    var processings = parseExports.processings;
    var processingText = processings.processingText,
        processingTagStart = processings.processingTagStart,
        processingTagName = processings.processingTagName;

    it('was exported', function () {
        expect(processingTagName).toBeDefined();
    });

    describe('change state', function () {

        describe('to TEXT', function () {
            var contextOfParse = new ContextOfParse();

            processingText(contextOfParse, 'a');
            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, 's');
            processingTagName(contextOfParse, '*');

            it('contextOfParse.state is TEXT', function () {
                expect(contextOfParse.state).toBe(statesExports.TEXT);
            });
            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('a<s*');
            });
            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.textBuffer).toBe('a<s*');
            });
        });

        describe('to TEXT when tag close after name with \'>\' and  without \'/\'', function () {
            describe('tag without nesting', function () {
                var contextOfParse = new ContextOfParse();

                processingText(contextOfParse, 'a');
                processingText(contextOfParse, '<');
                processingTagStart(contextOfParse, 'b');
                processingTagName(contextOfParse, 'r');
                processingTagName(contextOfParse, '>');

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
                    it('is Tag', function () {
                        expect(tag instanceof simpleDOMNodes.Tag).toBeTruthy();
                    });
                    it('correct textNode.text', function () {
                        expect(tag.name).toBe('br');
                    });
                    it('not add to contextOfParse.treeStack', function () {
                        var treeStack = contextOfParse.treeStack;
                        expect(treeStack.length).toBe(1);
                        expect(treeStack[0]).toBe(contextOfParse.result);
                    });
                });
            });

            describe('common tag', function () {
                var contextOfParse = new ContextOfParse();

                processingText(contextOfParse, 'a');
                processingText(contextOfParse, '<');
                processingTagStart(contextOfParse, 'd');
                processingTagName(contextOfParse, 'i');
                processingTagName(contextOfParse, 'v');
                processingTagName(contextOfParse, '>');

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
        });

        describe('to TAG_BODY', function () {
            var contextOfParse = new ContextOfParse();

            processingText(contextOfParse, 'a');
            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, 's');
            processingTagName(contextOfParse, 't');
            processingTagName(contextOfParse, ' ');

            it('contextOfParse.state is TAG_BODY', function () {
                expect(contextOfParse.state).toBe(statesExports.TAG_BODY);
            });
            it('correct contextOfParse.buffer', function () {
                expect(contextOfParse.buffer).toBe('a<st ');
            });
            it('correct contextOfParse.textBuffer', function () {
                expect(contextOfParse.textBuffer).toBe('a');
            });
            it('correct contextOfParse.tagName', function () {
                expect(contextOfParse.tagName).toBe('st');
            });
        });

        describe('to TAG_CLOSE', function () {
            var contextOfParse = new ContextOfParse();

            processingText(contextOfParse, 'a');
            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, 's');
            processingTagName(contextOfParse, 't');
            processingTagName(contextOfParse, '/');

            it('contextOfParse.state is TAG_CLOSE', function () {
                expect(contextOfParse.state).toBe(statesExports.TAG_CLOSE);
            });
            it('correct contextOfParse.buffer', function () {
                expect(contextOfParse.buffer).toBe('a<st/');
            });
            it('correct contextOfParse.textBuffer', function () {
                expect(contextOfParse.textBuffer).toBe('a');
            });
            it('correct contextOfParse.tagName', function () {
                expect(contextOfParse.tagName).toBe('st');
            });


        });

    });
});