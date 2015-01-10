describe('closeTag (DTesting.exports.simpleDOM.parse.builders)', function () {
    var simpleDOMNodes = DTesting.global.simpleDOM.nodes;
    var simpleDOMHelpers = DTesting.global.simpleDOM.helpers;

    var parseExports = DTesting.exports.simpleDOM.parse;
    var statesExports = parseExports.states;
    var ContextOfParse = parseExports.ContextOfParse;
    var closeTag = parseExports.builders.closeTag;

    it('was exported', function () {
        expect(closeTag).toBeDefined();
    });

    describe('simple situation for one tag', function () {
        var contextOfParse = new ContextOfParse();
        contextOfParse.buffer = 'hello</div>';
        contextOfParse.textBuffer = 'hello';
        contextOfParse.tagName = 'div';
        contextOfParse.state = statesExports.CLOSED_TAG_NAME;

        var tag = new simpleDOMNodes.Tag('div'),
            treeStack = contextOfParse.treeStack;
        simpleDOMHelpers.appendChild(treeStack[treeStack.length - 1], tag);
        treeStack.push(tag);

        closeTag(contextOfParse);

        it('contextOfParse.state is TEXT', function () {
            expect(contextOfParse.state).toBe(statesExports.TEXT);
        });

        it('contextOfParse.buffer is correct', function () {
            expect(contextOfParse.buffer).toBe('');
        });

        it('contextOfParse.textBuffer is correct', function () {
            expect(contextOfParse.textBuffer).toBe('');
        });

        it('contextOfParse.treeStack is correct', function () {
            var treeStack = contextOfParse.treeStack;
            expect(treeStack.length).toBe(1);
            expect(treeStack[0]).toBe(contextOfParse.result);
        });

        describe('tag', function () {
            var tag = contextOfParse.result.childNodes[0];
            it('is define', function () {
                expect(tag).toBeDefined();
            });
            it('has correct name', function () {
                expect(tag.name).toBe('div');
            });
            it('has child', function () {
                expect(tag.childNodes.length).toBe(1);
            });
        });

        describe('textNode', function () {
            var textNode = contextOfParse.result.childNodes[0].childNodes[0];
            it('is define', function () {
                expect(textNode).toBeDefined();
            });
            it('has correct text', function () {
                expect(textNode.text).toBe('hello');
            });
        });

    });

    describe('situation for error on 1 nesting level', function () {
        var contextOfParse = new ContextOfParse();
        contextOfParse.buffer = 'hello</div>';
        contextOfParse.textBuffer = 'hello';
        contextOfParse.tagName = 'div';
        contextOfParse.state = statesExports.CLOSED_TAG_NAME;

        var treeStack = contextOfParse.treeStack;

        var div = new simpleDOMNodes.Tag('div');
        simpleDOMHelpers.appendChild(treeStack[treeStack.length - 1], div);
        treeStack.push(div);

        var span = new simpleDOMNodes.Tag('span');
        simpleDOMHelpers.appendChild(treeStack[treeStack.length - 1], span);
        treeStack.push(span);

        closeTag(contextOfParse);

        it('contextOfParse.state is TEXT', function () {
            expect(contextOfParse.state).toBe(statesExports.TEXT);
        });

        it('contextOfParse.buffer is correct', function () {
            expect(contextOfParse.buffer).toBe('');
        });

        it('contextOfParse.textBuffer is correct', function () {
            expect(contextOfParse.textBuffer).toBe('');
        });

        it('contextOfParse.treeStack is correct', function () {
            var treeStack = contextOfParse.treeStack;
            expect(treeStack.length).toBe(1);
            expect(treeStack[0]).toBe(contextOfParse.result);
        });

        describe('div', function () {
            var div = contextOfParse.result.childNodes[0];
            it('is define', function () {
                expect(div).toBeDefined();
            });
            it('has correct name', function () {
                expect(div.name).toBe('div');
            });
            it('has child', function () {
                expect(div.childNodes.length).toBe(1);
            });
        });

        describe('span', function () {
            var span = contextOfParse.result.childNodes[0].childNodes[0];
            it('is define', function () {
                expect(span).toBeDefined();
            });
            it('has correct name', function () {
                expect(span.name).toBe('span');
            });
            it('has child', function () {
                expect(span.childNodes.length).toBe(1);
            });
        });

        describe('textNode', function () {
            var textNode = contextOfParse.result.childNodes[0].childNodes[0].childNodes[0];
            it('is define', function () {
                expect(textNode).toBeDefined();
            });
            it('has correct text', function () {
                expect(textNode.text).toBe('hello');
            });
        });

    });

});