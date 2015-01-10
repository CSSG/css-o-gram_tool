describe('DTesting.exports.simpleDOM.parse', function () {
    var parseExports = DTesting.exports.simpleDOM.parse;
    var statesExports = parseExports.states;
    var ContextOfParse = parseExports.ContextOfParse;
    var microhelpersExports = parseExports.microehelpers;
    var buildersExports = parseExports.builders;
    var processings = parseExports.processings;

    it('states was exported', function () {
        expect(statesExports).toBeDefined();
    });

    it('ContextOfParse was exported', function () {
        expect(ContextOfParse).toBeDefined();
    });

    it('microhelpersExports was exported', function () {
        expect(microhelpersExports).toBeDefined();
    });

    it('buildersExports was exported', function () {
        expect(buildersExports).toBeDefined();
    });

    it('processings was exported', function () {
        expect(processings).toBeDefined();
    });


});