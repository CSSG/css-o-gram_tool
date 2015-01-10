describe('addAttribute (DTesting.exports.simpleDOM.parse.microhelpers)', function () {
    var parseExports = DTesting.exports.simpleDOM.parse;
    var ContextOfParse = parseExports.ContextOfParse;
    var addAttribute = parseExports.microehelpers.addAttribute;

    it('was exported', function () {
        expect(addAttribute).toBeDefined();
    });

    describe('correct for contextOfParse only with empty attributes', function () {
        var contextOfParse = new ContextOfParse();
        contextOfParse.attributeName = 'id';
        contextOfParse.attributeValue = 'main';
        addAttribute(contextOfParse);
        it('attributes is object', function () {
            expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
        });
        it('attribute defined', function () {
            expect(contextOfParse.attributes['id']).toBeDefined();
        });
        it('attribute has correct value', function () {
            expect(contextOfParse.attributes['id']).toBe('main');
        });
    });

    describe('correct for contextOfParse only with attributes', function () {
        var contextOfParse = new ContextOfParse(),
            attributesCache = {
                'class': 'alpha'
            };

        contextOfParse.attributes = attributesCache;
        contextOfParse.attributeName = 'id';
        contextOfParse.attributeValue = 'main';
        addAttribute(contextOfParse);

        it('contextOfParse.attributes is saved', function () {
            expect(contextOfParse.attributes).toBe(attributesCache);
        });
        it('attributes is object', function () {
            expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
        });
        it('attribute defined', function () {
            expect(contextOfParse.attributes['id']).toBeDefined();
        });
        it('attribute has correct value', function () {
            expect(contextOfParse.attributes['id']).toBe('main');
        });

    });

    describe('correct for contextOfParse with attributeValue', function () {
        var contextOfParse = new ContextOfParse();
        contextOfParse.attributeName = 'id';
        contextOfParse.attributeValue = 'main';
        addAttribute(contextOfParse, 'test');
        it('attributes is object', function () {
            expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
        });
        it('attribute defined', function () {
            expect(contextOfParse.attributes['id']).toBeDefined();
        });
        it('attribute has correct value', function () {
            expect(contextOfParse.attributes['id']).toBe('test');
        });
    });

});