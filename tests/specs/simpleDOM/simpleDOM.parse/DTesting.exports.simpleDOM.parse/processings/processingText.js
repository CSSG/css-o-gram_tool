describe('processingText (DTesting.exports.simpleDOM.parse.processings)', function () {
    var simpleDOMNodes = DTesting.global.simpleDOM.nodes;
    var parseExports = DTesting.exports.simpleDOM.parse;
    var statesExports = parseExports.states;
    var ContextOfParse = parseExports.ContextOfParse;
    var processings = parseExports.processings;
    var processingText = processings.processingText;

    it('was exported', function () {
        expect(processingText).toBeDefined();
    });

    describe('change contextOfParse.state for \'<\'', function () {
        var contextOfParse = new ContextOfParse();
        processingText(contextOfParse, 'A');
        processingText(contextOfParse, 'S');
        processingText(contextOfParse, 'T');
        processingText(contextOfParse, '<');
        it('correct contextOfParse.state after processing \'<\'', function () {
            expect(contextOfParse.state).toBe(statesExports.TAG_START);
        });
        it('correct contextOfParse.buffer', function () {
            expect(contextOfParse.buffer).toBe('AST<');
        });
        it('correct contextOfParse.textBuffer', function () {
            expect(contextOfParse.textBuffer).toBe('AST');
        });
    });


    describe('not change contextOfParse.state for random symbols', function () {
        var contextOfParse = new ContextOfParse();
        processingText(contextOfParse, 'a');
        it('save TEXT state after processing \'a\'', function () {
            expect(contextOfParse.state).toBe(statesExports.TEXT);
        });
        processingText(contextOfParse, '/');
        it('save TEXT state after processing \'/\'', function () {
            expect(contextOfParse.state).toBe(statesExports.TEXT);
        });
        processingText(contextOfParse, 'ф');
        it('save TEXT state after processing \'ф\'', function () {
            expect(contextOfParse.state).toBe(statesExports.TEXT);
        });
        processingText(contextOfParse, '1');
        it('save TEXT state after processing \'1\'', function () {
            expect(contextOfParse.state).toBe(statesExports.TEXT);
        });
    });

});