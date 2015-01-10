describe('simpleDOM DTesting.exports: ContextOfParse', function () {
    var simpleDOMNodes = DTesting.global.simpleDOM.nodes;

    var parseExports = DTesting.exports.simpleDOM.parse;
    var statesExports = parseExports.states;
    var ContextOfParse = parseExports.ContextOfParse;


    it('was exported', function () {
        expect(ContextOfParse).toBeDefined();
    });

    it('is constructor', function () {
        var contextOfParse = new ContextOfParse();
        expect(contextOfParse).toEqual(jasmine.any(Object));
    });

    describe('has correct start properties', function () {
        var contextOfParse = new ContextOfParse();

        it('state', function () {
            expect(contextOfParse.state).toBe(statesExports.TEXT);
        });

        it('buffer', function () {
            expect(contextOfParse.buffer).toBe('');
        });

        it('textBuffer', function () {
            expect(contextOfParse.textBuffer).toBe('');
        });

        it('tagName', function () {
            expect(contextOfParse.tagName).toBe('');
        });

        it('attributeName', function () {
            expect(contextOfParse.attributeName).toBe('');
        });

        it('attributeValueSeparator', function () {
            expect(contextOfParse.attributeValueSeparator).toBe('');
        });

        it('attributeValue', function () {
            expect(contextOfParse.attributeValue).toBe('');
        });

        it('attributes', function () {
            expect(contextOfParse.attributes).toBeNull();
        });

        it('result', function () {
            expect(contextOfParse.result instanceof simpleDOMNodes.Fragment).toBeTruthy();
        });

        it('treeStack', function () {
            var treeStack = contextOfParse.treeStack;
            expect(treeStack).toEqual(jasmine.any(Array));
            expect(treeStack.length).toBe(1);
            expect(treeStack[0] instanceof simpleDOMNodes.Fragment).toBeTruthy();
        });

        it('isXML mode off', function () {
            expect(contextOfParse.isXMLMode).toBe(false);
        });

        it('commentBuffer', function () {
            expect(contextOfParse.commentBuffer).toBe('');
        });
        it('commentToken', function () {
            expect(contextOfParse.commentToken).toBe('');
        });

        describe('use settings', function () {
            var contextOfParse = new ContextOfParse({
                    isXML: true
                });

            it('isXML mode on', function () {
                expect(contextOfParse.isXMLMode).toBe(true);
            });
        });

    });

    describe('destructor', function () {
        var contextOfParse = new ContextOfParse();

        it('has', function () {
            expect(contextOfParse.destructor).toBeDefined();
        });

        it('work', function () {
            contextOfParse.destructor();
            expect(true).toBeTruthy();
        });

        describe('properties is clean', function () {
            it('treeStack', function () {
                expect(contextOfParse.treeStack).toBeNull();
            });
            it('result', function () {
                expect(contextOfParse.result).toBeNull();
            });
            it('state', function () {
                expect(contextOfParse.state).toBeNull();
            });
            it('buffer', function () {
                expect(contextOfParse.buffer).toBeNull();
            });
            it('textBuffer', function () {
                expect(contextOfParse.textBuffer).toBeNull();
            });
            it('tagName', function () {
                expect(contextOfParse.tagName).toBeNull();
            });
            it('attributeName', function () {
                expect(contextOfParse.attributeName).toBeNull();
            });
            it('attributeValue', function () {
                expect(contextOfParse.attributeValue).toBeNull();
            });
            it('attributeValueSeparator', function () {
                expect(contextOfParse.attributeValueSeparator).toBeNull();
            });
            it('attributes', function () {
                expect(contextOfParse.attributes).toBeNull();
            });
            it('commentBuffer', function () {
                expect(contextOfParse.commentBuffer).toBeNull();
            });
            it('commentToken', function () {
                expect(contextOfParse.commentToken).toBeNull();
            });

        });

    });

});