describe('buildText (DTesting.exports.simpleDOM.parse.builders)', function () {
    var simpleDOMNodes = DTesting.global.simpleDOM.nodes;

    var parseExports = DTesting.exports.simpleDOM.parse;
    var statesExports = parseExports.states;
    var ContextOfParse = parseExports.ContextOfParse;
    var buildText = parseExports.builders.buildText;

    it('was exported', function () {
        expect(buildText).toBeDefined();
    });

    describe('build text only', function () {
        var contextOfParse = new ContextOfParse();
        contextOfParse.buffer = 'hello';
        contextOfParse.state = statesExports.TEXT;
        contextOfParse.textBuffer = 'hello';

        buildText(contextOfParse);

        it('contextOfParse.buffer is clean', function () {
            expect(contextOfParse.buffer).toBe('');
        });

        it('contextOfParse.textBuffer is clean', function () {
            expect(contextOfParse.textBuffer).toBe('');
        });

        it('correct contextOfParse.stack state', function () {
            expect(contextOfParse.treeStack[1]).toBeUndefined();
            expect(contextOfParse.treeStack[0] instanceof  simpleDOMNodes.Fragment).toBeTruthy();
        });

        describe('building Text', function () {
            it('correct position', function () {
                expect(contextOfParse.result.childNodes[0] instanceof simpleDOMNodes.Text).toBeTruthy();
            });
            it('correct Text.text', function () {
                expect(contextOfParse.result.childNodes[0].text).toBe('hello');
            });
        });

    });

});