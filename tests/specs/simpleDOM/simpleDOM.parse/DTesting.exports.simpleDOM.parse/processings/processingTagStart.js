describe('processingTagStart (DTesting.exports.simpleDOM.parse.processings)', function () {
    var simpleDOMNodes = DTesting.global.simpleDOM.nodes;
    var parseExports = DTesting.exports.simpleDOM.parse;
    var statesExports = parseExports.states;
    var ContextOfParse = parseExports.ContextOfParse;
    var processings = parseExports.processings;
    var processingText = processings.processingText,
        processingTagStart = processings.processingTagStart;

    it('was exported', function () {
        expect(processingTagStart).toBeDefined();
    });

    describe('change state', function () {

        describe('to TEXT', function () {
            describe('correct for \' \'', function () {
                var contextOfParse = new ContextOfParse();

                processingText(contextOfParse, '<');
                processingTagStart(contextOfParse, ' ');

                it('contextOfParse.state is TEXT', function () {
                    expect(contextOfParse.state).toBe(statesExports.TEXT);
                });
                it('correct contextOfParse.buffer', function () {
                    expect(contextOfParse.buffer).toBe('< ');
                });
                it('correct contextOfParse.textBuffer', function () {
                    expect(contextOfParse.textBuffer).toBe('< ');
                });
            });
            describe('correct for \'-\'', function () {
                var contextOfParse = new ContextOfParse();

                processingText(contextOfParse, '<');
                processingTagStart(contextOfParse, '-');

                it('contextOfParse.state is TEXT', function () {
                    expect(contextOfParse.state).toBe(statesExports.TEXT);
                });
                it('correct contextOfParse.buffer', function () {
                    expect(contextOfParse.buffer).toBe('<-');
                });
                it('correct contextOfParse.textBuffer', function () {
                    expect(contextOfParse.textBuffer).toBe('<-');
                });
            });
            describe('correct for \'.\'', function () {
                var contextOfParse = new ContextOfParse();

                processingText(contextOfParse, '<');
                processingTagStart(contextOfParse, '.');

                it('contextOfParse.state is TEXT', function () {
                    expect(contextOfParse.state).toBe(statesExports.TEXT);
                });
                it('correct contextOfParse.buffer', function () {
                    expect(contextOfParse.buffer).toBe('<.');
                });
                it('correct contextOfParse.textBuffer', function () {
                    expect(contextOfParse.textBuffer).toBe('<.');
                });
            });
            describe('correct for \'ы\'', function () {
                var contextOfParse = new ContextOfParse();

                processingText(contextOfParse, '<');
                processingTagStart(contextOfParse, 'ы');

                it('contextOfParse.state is TEXT', function () {
                    expect(contextOfParse.state).toBe(statesExports.TEXT);
                });
                it('correct contextOfParse.buffer', function () {
                    expect(contextOfParse.buffer).toBe('<ы');
                });
                it('correct contextOfParse.textBuffer', function () {
                    expect(contextOfParse.textBuffer).toBe('<ы');
                });
            });
        });

        describe('to TAG_NAME', function () {
            var contextOfParse = new ContextOfParse();

            processingText(contextOfParse, 'b');
            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, 'a');

            it('contextOfParse.state is TAG_NAME', function () {
                expect(contextOfParse.state).toBe(statesExports.TAG_NAME);
            });
            it('correct contextOfParse.buffer', function () {
                expect(contextOfParse.buffer).toBe('b<a');
            });
            it('correct contextOfParse.textBuffer', function () {
                expect(contextOfParse.textBuffer).toBe('b');
            });
            it('correct contextOfParse.tagName', function () {
                expect(contextOfParse.tagName).toBe('a');
            });
        });

        describe('to CLOSED_TAG_START', function () {
            var contextOfParse = new ContextOfParse();

            processingText(contextOfParse, 'a');
            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, '/');

            it('contextOfParse.state is CLOSED_TAG_START', function () {
                expect(contextOfParse.state).toBe(statesExports.CLOSED_TAG_START);
            });
            it('correct contextOfParse.buffer', function () {
                expect(contextOfParse.buffer).toBe('a</');
            });
            it('correct contextOfParse.textBuffer', function () {
                expect(contextOfParse.textBuffer).toBe('a');
            });

        });

        describe('to DECLARATION_START', function () {
            var contextOfParse = new ContextOfParse();

            processingText(contextOfParse, 'a');
            processingText(contextOfParse, '<');
            processingTagStart(contextOfParse, '!');

            it('contextOfParse.state is DECLARATION_START', function () {
                expect(contextOfParse.state).toBe(statesExports.DECLARATION_START);
            });
            it('correct contextOfParse.buffer', function () {
                expect(contextOfParse.buffer).toBe('a<!');
            });
            it('correct contextOfParse.textBuffer', function () {
                expect(contextOfParse.textBuffer).toBe('a');
            });
        });
    });


});