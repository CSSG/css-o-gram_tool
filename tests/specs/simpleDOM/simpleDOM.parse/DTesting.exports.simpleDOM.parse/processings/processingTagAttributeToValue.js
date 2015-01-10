describe('processingTagAttributeToValue (DTesting.exports.simpleDOM.parse.processings)', function () {
    var simpleDOMNodes = DTesting.global.simpleDOM.nodes;
    var parseExports = DTesting.exports.simpleDOM.parse;
    var statesExports = parseExports.states;
    var ContextOfParse = parseExports.ContextOfParse;
    var processings = parseExports.processings;
    var processingTagAttributeToValue = processings.processingTagAttributeToValue,
        processingTagAttributeName = processings.processingTagAttributeName,
        processingTagBody = processings.processingTagBody,
        processingText = processings.processingText,
        processingTagStart = processings.processingTagStart,
        processingTagName = processings.processingTagName;

    it('was exported', function () {
        expect(processingTagAttributeToValue).toBeDefined();
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
            processingTagBody(contextOfParse, 'd');
            processingTagAttributeName(contextOfParse, 'a');
            processingTagAttributeName(contextOfParse, 't');
            processingTagAttributeName(contextOfParse, 'a');
            processingTagAttributeName(contextOfParse, '=');
            processingTagAttributeToValue(contextOfParse, '|');

            it('contextOfParse.state is TEXT', function () {
                expect(contextOfParse.state).toBe(statesExports.TEXT);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('a<div data=|');
            });

            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.textBuffer).toBe('a<div data=|');
            });
        });

        describe('to TEXT when tag closed', function () {
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
            processingTagAttributeName(contextOfParse, '>');

            it('contextOfParse.state is TEXT', function () {
                expect(contextOfParse.state).toBe(statesExports.TEXT);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('');
            });

            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.textBuffer).toBe('');
            });

            it('contextOfParse.attributeName is correct', function () {
                expect(contextOfParse.attributeName).toBe('data');
            });

            it('attributes is object', function () {
                expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
            });

            it('attribute defined', function () {
                expect(contextOfParse.attributes['data']).toBeDefined();
            });

            it('attribute has correct value', function () {
                expect(contextOfParse.attributes['data']).toBe('');
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

                it('attributes is object', function () {
                    expect(tag.attributes).toEqual(jasmine.any(Object));
                });

                it('attribute defined', function () {
                    expect(tag.attributes['data']).toBeDefined();
                });

                it('attribute has correct value', function () {
                    expect(tag.attributes['data']).toBe('');
                });
            });

        });

        describe('to TAG_ATTRIBUTE_VALUE for \'\'\'', function () {
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
            processingTagAttributeName(contextOfParse, '=');
            processingTagAttributeToValue(contextOfParse, '\'');

            it('contextOfParse.state is TAG_ATTRIBUTE_VALUE', function () {
                expect(contextOfParse.state).toBe(statesExports.TAG_ATTRIBUTE_VALUE);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('a<div data=\'');
            });

            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.textBuffer).toBe('a');
            });

            it('contextOfParse.attributeName is correct', function () {
                expect(contextOfParse.attributeName).toBe('data');
            });

            it('contextOfParse.attributeValueSeparator is correct', function () {
                expect(contextOfParse.attributeValueSeparator).toBe('\'');
            });

            it('contextOfParse.attributeValueSeparator is correct', function () {
                expect(contextOfParse.attributeValue).toBe('');
            });
        });

        describe('to TAG_ATTRIBUTE_VALUE for \'"\'', function () {
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
            processingTagAttributeName(contextOfParse, '=');
            processingTagAttributeToValue(contextOfParse, '"');

            it('contextOfParse.state is TAG_ATTRIBUTE_VALUE', function () {
                expect(contextOfParse.state).toBe(statesExports.TAG_ATTRIBUTE_VALUE);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('a<div data="');
            });

            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.textBuffer).toBe('a');
            });

            it('contextOfParse.attributeName is correct', function () {
                expect(contextOfParse.attributeName).toBe('data');
            });

            it('contextOfParse.attributeValueSeparator is correct', function () {
                expect(contextOfParse.attributeValueSeparator).toBe('"');
            });

            it('contextOfParse.attributeName is correct', function () {
                expect(contextOfParse.attributeValue).toBe('');
            });
        });

        describe('to TAG_BODY for attribute without value', function () {
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
            processingTagAttributeName(contextOfParse, ' ');

            it('contextOfParse.state is TAG_BODY', function () {
                expect(contextOfParse.state).toBe(statesExports.TAG_BODY);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('a<div data ');
            });

            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.textBuffer).toBe('a');
            });

            it('contextOfParse.attributeName is correct', function () {
                expect(contextOfParse.attributeName).toBe('data');
            });

            it('attributes is object', function () {
                expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
            });
            it('attribute defined', function () {
                expect(contextOfParse.attributes['data']).toBeDefined();
            });
            it('attribute has correct value', function () {
                expect(contextOfParse.attributes['data']).toBe('');
            });


        });

        describe('to TAG_CLOSE for attribute without value', function () {
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
            processingTagAttributeName(contextOfParse, '/');

            it('contextOfParse.state is TAG_CLOSE', function () {
                expect(contextOfParse.state).toBe(statesExports.TAG_CLOSE);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('a<div data/');
            });

            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.textBuffer).toBe('a');
            });

            it('contextOfParse.attributeName is correct', function () {
                expect(contextOfParse.attributeName).toBe('data');
            });

            it('attributes is object', function () {
                expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
            });
            it('attribute defined', function () {
                expect(contextOfParse.attributes['data']).toBeDefined();
            });
            it('attribute has correct value', function () {
                expect(contextOfParse.attributes['data']).toBe('');
            });

        });
    });
});