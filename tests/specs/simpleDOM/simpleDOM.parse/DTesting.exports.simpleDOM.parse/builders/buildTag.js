describe('buildTag (DTesting.exports.simpleDOM.parse.builders)', function () {
    var simpleDOMNodes = DTesting.global.simpleDOM.nodes;
    var parseExports = DTesting.exports.simpleDOM.parse;
    var statesExports = parseExports.states;
    var ContextOfParse = parseExports.ContextOfParse;
    var buildTag = parseExports.builders.buildTag;

    it('was exported', function () {
        expect(buildTag).toBeDefined();
    });

    //some HTML tags define as simple. for example <img>, <input>, <br>, <hr>, <link>, <meta>
    describe('build simple tag without nesting and attributes', function () {
        var contextOfParse = new ContextOfParse();
        contextOfParse.buffer = 'a<br>';
        contextOfParse.state = statesExports.TAG_NAME;
        contextOfParse.textBuffer = 'a';
        contextOfParse.tagName = 'br';
        buildTag(contextOfParse);

        it('contextOfParse.buffer is clean', function () {
            expect(contextOfParse.buffer).toBe('');
        });

        it('contextOfParse.textBuffer is clean', function () {
            expect(contextOfParse.textBuffer).toBe('');
        });

        it('correct contextOfParse.state', function () {
            expect(contextOfParse.state).toBe(statesExports.TEXT);
        });

        it('correct contextOfParse.treeStack state', function () {
            expect(contextOfParse.treeStack[1]).toBeUndefined();
            expect(contextOfParse.treeStack[0] instanceof  simpleDOMNodes.Fragment).toBeTruthy();
        });

        describe('building Text', function () {
            it('correct position', function () {
                expect(contextOfParse.result.childNodes[0] instanceof simpleDOMNodes.Text).toBeTruthy();
            });
            it('correct Text.text', function () {
                expect(contextOfParse.result.childNodes[0].text).toBe('a');
            });
        });
        describe('building Tag', function () {
            it('correct position', function () {
                expect(contextOfParse.result.childNodes[1] instanceof simpleDOMNodes.Tag).toBeTruthy();
            });
            it('correct Text.text', function () {
                expect(contextOfParse.result.childNodes[1].name).toBe('br');
            });
        });
    });

    describe('build simple tag with attributes', function () {
        var contextOfParse = new ContextOfParse();
        contextOfParse.buffer = 'a<hr class="className" id="id">';
        contextOfParse.state = statesExports.TAG_NAME;
        contextOfParse.textBuffer = 'a';
        contextOfParse.tagName = 'hr';
        contextOfParse.attributes = {
            'class': 'className',
            id: 'id'
        };
        buildTag(contextOfParse);

        it('tag has correct attributes', function () {
            var hrTag = contextOfParse.result.childNodes[1];
            expect(hrTag.attributes['class']).toBe('className');
            expect(hrTag.attributes.id).toBe('id');
        });
    });

    describe('build tag with nesting', function () {
        var contextOfParse = new ContextOfParse();
        contextOfParse.buffer = '<div>';
        contextOfParse.state = statesExports.TAG_NAME;
        contextOfParse.tagName = 'div';
        buildTag(contextOfParse);

        it('correct treeStack position', function () {
            var treeStack = contextOfParse.treeStack;
            expect(treeStack.length).toBe(2);
            expect(treeStack[1]).toBe(contextOfParse.result.childNodes[0]);
        });

    });

    describe('build undefined closed tag', function () {
        var contextOfParse = new ContextOfParse();
        contextOfParse.buffer = '<vid/>';
        contextOfParse.state = statesExports.TAG_NAME;
        contextOfParse.tagName = 'vid';
        buildTag(contextOfParse, true);

        it('correct treeStack position', function () {
            var treeStack = contextOfParse.treeStack;
            expect(treeStack.length).toBe(1);
        });
    });

    describe('build simple tag as tag with nesting for XML', function () {
        var contextOfParse = new ContextOfParse({isXML: true});
        contextOfParse.buffer = '<br>';
        contextOfParse.state = statesExports.TAG_NAME;
        contextOfParse.tagName = 'br';
        buildTag(contextOfParse);

        it('correct treeStack position', function () {
            var treeStack = contextOfParse.treeStack;
            expect(treeStack.length).toBe(2);
            expect(treeStack[1]).toBe(contextOfParse.result.childNodes[0]);
        });

    });

    describe('build simple tag as tag with nesting for XML', function () {
        var contextOfParse = new ContextOfParse({isXML: true});
        contextOfParse.buffer = '<br/>';
        contextOfParse.state = statesExports.TAG_NAME;
        contextOfParse.tagName = 'br';
        buildTag(contextOfParse, true);

        it('correct treeStack position', function () {
            var treeStack = contextOfParse.treeStack;
            expect(treeStack.length).toBe(1);
        });

    });

});