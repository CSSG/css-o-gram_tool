describe('processingTagAttributeValue (DTesting.exports.simpleDOM.parse.processings)', function () {
    var simpleDOMNodes = DTesting.global.simpleDOM.nodes;
    var parseExports = DTesting.exports.simpleDOM.parse;
    var statesExports = parseExports.states;
    var ContextOfParse = parseExports.ContextOfParse;
    var processings = parseExports.processings;
    var processingTagAttributeValue = processings.processingTagAttributeValue,
        processingTagAttributeToValue = processings.processingTagAttributeToValue,
        processingTagAttributeName = processings.processingTagAttributeName,
        processingTagBody = processings.processingTagBody,
        processingText = processings.processingText,
        processingTagStart = processings.processingTagStart,
        processingTagName = processings.processingTagName;

    it('was exported', function () {
        expect(processingTagAttributeToValue).toBeDefined();
    });

    describe('change state', function () {
        describe('to TAG_ATTRIBUTE_VALUE_END', function () {
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
            processingTagAttributeValue(contextOfParse, 'a');
            processingTagAttributeValue(contextOfParse, '"');

            it('contextOfParse.state is TAG_ATTRIBUTE_VALUE_END', function () {
                expect(contextOfParse.state).toBe(statesExports.TAG_ATTRIBUTE_VALUE_END);
            });

            it('contextOfParse.buffer is correct', function () {
                expect(contextOfParse.buffer).toBe('a<div data="a"');
            });

            it('contextOfParse.textBuffer is correct', function () {
                expect(contextOfParse.textBuffer).toBe('a');
            });

            it('contextOfParse.attributes is object', function () {
                expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
            });
            it('attribute defined', function () {
                expect(contextOfParse.attributes['data']).toBeDefined();
            });
            it('attribute has correct value', function () {
                expect(contextOfParse.attributes['data']).toBe('a');
            });
        });

    });
});