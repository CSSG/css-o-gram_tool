describe('DL.htmlToAST()', function () {

    describe('correct define', function () {
        it('module defined', function () {
            expect(DL.htmlToAST).toBeDefined();
        });

        it('module is Object', function () {
            expect(DL.htmlToAST).toEqual(jasmine.any(Object));
        });

        describe('parts', function () {
            var htmlToAST = DL.htmlToAST;

            it('parse is define', function () {
                expect(htmlToAST.parse).toBeDefined();
            });

            it('parse is function', function () {
                expect(htmlToAST.parse).toEqual(jasmine.any(Function));
            });


            it('nodes is define', function () {
                expect(htmlToAST.nodes).toBeDefined();
            });

            it('nodes is object', function () {
                expect(htmlToAST.nodes).toEqual(jasmine.any(Object));
            });


            describe('nodes', function () {
                var htmlToASTNodes = htmlToAST.nodes;

                it('Fragment is define', function () {
                    expect(htmlToASTNodes.Fragment).toBeDefined();
                });

                it('Fragment is constructor', function () {
                    expect(htmlToASTNodes.Fragment).toEqual(jasmine.any(Function));
                });


                it('Tag is define', function () {
                    expect(htmlToASTNodes.Tag).toBeDefined();
                });

                it('Tag is constructor', function () {
                    expect(htmlToASTNodes.Tag).toEqual(jasmine.any(Function));
                });


                it('Text is define', function () {
                    expect(htmlToASTNodes.Text).toBeDefined();
                });

                it('Text is constructor', function () {
                    expect(htmlToASTNodes.Text).toEqual(jasmine.any(Function));
                });


                it('Comment is define', function () {
                    expect(htmlToASTNodes.Comment).toBeDefined();
                });

                it('Comment is constructor', function () {
                    expect(htmlToASTNodes.Comment).toEqual(jasmine.any(Function));
                });

            });


            it('helpers is define', function () {
                expect(htmlToAST.helpers).toBeDefined();
            });

            it('helpers is object', function () {
                expect(htmlToAST.helpers).toEqual(jasmine.any(Object));
            });


            describe('helpers', function () {
                var helpers = htmlToAST.helpers;

                it('appendChild is defined', function () {
                    expect(helpers.appendChild).toBeDefined();
                });

                it('appendChild is function', function () {
                    expect(helpers.appendChild).toBeDefined();
                });

            });

        });


    });

    var htmlToAST = DL.htmlToAST,
        htmlToASTNodes = htmlToAST.nodes,
        htmlToASTHelpers = htmlToAST.helpers;

    describe('nodes instances construct and api', function () {

        describe('Fragment', function () {

            it('construct', function () {
                var fragment = new htmlToASTNodes.Fragment();
                expect(fragment).toEqual(jasmine.any(Object));
            });

            var fragment = new htmlToASTNodes.Fragment();

            it('type is define', function () {
                expect(fragment.type).toBeDefined();
            });

            it('type is \'fragment\'', function () {
                expect(fragment.type).toBe('fragment');
            });

            it('childNode is define', function () {
                expect(fragment.childNodes).toBeDefined();
            });

            it('childNodes is array', function () {
                expect(fragment.childNodes).toEqual(jasmine.any(Array));
            });

        });


        describe('Tag', function () {

            it('construct', function () {
                var tag = new htmlToASTNodes.Tag('div', {'class': 'block'});
                expect(tag).toEqual(jasmine.any(Object));
            });

            var tag = new htmlToASTNodes.Tag('div', {'class': 'block'});

            it('type is define', function () {
                expect(tag.type).toBeDefined();
            });

            it('type is \'tag\'', function () {
                expect(tag.type).toBe('tag');
            });

            it('childNode is define', function () {
                expect(tag.childNodes).toBeDefined();
            });

            it('childNodes is array', function () {
                expect(tag.childNodes).toEqual(jasmine.any(Array));
            });

            it('name is define', function () {
                expect(tag.name).toBeDefined();
            });

            it('name is \'div\'', function () {
                expect(tag.name).toBe('div');
            });

            it('attributes is define', function () {
                expect(tag.attributes).toBeDefined();
            });

            it('attributes is Object', function () {
                expect(tag.attributes).toEqual(jasmine.any(Object));
            });
        });


        describe('Text', function () {

            it('construct', function () {
                var text = new htmlToASTNodes.Text('text content');
                expect(text).toEqual(jasmine.any(Object));
            });

            var text = new htmlToASTNodes.Text('text content');

            it('type is define', function () {
                expect(text.type).toBeDefined();
            });

            it('type is \'text\'', function () {
                expect(text.type).toBe('text');
            });

            it('text is define', function () {
                expect(text.text).toBeDefined();
            });

            it('text is \'text content\'', function () {
                expect(text.text).toBe('text content');
            });

        });


        describe('Comment', function () {

            it('construct', function () {
                var comment = new htmlToASTNodes.Comment('comment text');
                expect(comment).toEqual(jasmine.any(Object));
            });

            var comment = new htmlToASTNodes.Comment('comment text');

            it('type is define', function () {
                expect(comment.type).toBeDefined();
            });

            it('type is \'comment\'', function () {
                expect(comment.type).toBe('comment');
            });

            it('text is define', function () {
                expect(comment.text).toBeDefined();
            });

            it('text is \'comment text\'', function () {
                expect(comment.text).toBe('comment text');
            });

        });

    });

    describe('helpers api', function () {
        it('appendChild() div into fragment', function () {
            var fragment = new htmlToASTNodes.Fragment(),
                div = new htmlToASTNodes.Tag('div', {'class': 'block'});
            htmlToASTHelpers.appendChild(fragment, div);
            expect(fragment.childNodes[0]).toBe(div);
        });
    });




    function createDefaultSpan(contentItem) {
        var createTagArguments = ['span', null];
        DL.cycle(arguments, function (contentItem) {
            createTagArguments.push(contentItem);
        });
        return DTesting.utils.createTag.apply(DTesting.utils, createTagArguments);
    }
    function defaultSpanTests(span) {
        it('div is parsed', function () {
            expect(span).toBeDefined();
        });

        it('div is parsed as Tag', function () {
            expect(span instanceof htmlToASTNodes.Tag).toBeTruthy();
        });

        it('correct name', function () {
            expect(span.name).toBe('div');
        });

        it('attributes is empty', function () {
            expect(DL.getObjectLength(span.attributes)).toBe(0);
        });
    }

    function createDefaultDiv(contentItem) {
        var createTagArguments = ['div', {'class': 'block', 'data-foo': 'bar'}];
        DL.cycle(arguments, function (contentItem) {
            createTagArguments.push(contentItem);
        });
        return DTesting.utils.createTag.apply(DTesting.utils, createTagArguments);
    }
    function defaultDivTests (div) {
        it ('div is parsed', function () {
            expect(div).toBeDefined();
        });

        it('div is parsed as Tag', function () {
            expect(div instanceof htmlToASTNodes.Tag).toBeTruthy();
        });

        it('correct name', function () {
            expect(div.name).toBe('div');
        });

        describe('correct attributes', function () {
            var attributes = div.attributes;
            it('class is block', function () {
                expect(attributes['class']).toBe('block');
            });
            it('data-foo is bar', function () {
                expect(attributes['data-foo']).toBe('bar');
            });
        });

    }



    describe('parse', function () {

        describe('private export', function () {
            var states,
                htmlToASTExport;

            describe('common exports check', function () {
                htmlToASTExport = DTesting.exports.DL.htmlToAST;

                it('htmlToAST namespace was exported', function () {
                    expect(htmlToASTExport).toBeDefined();
                });

                states = htmlToASTExport.states;

                it('states was exported', function () {
                    expect(states).toBeDefined();
                });
            });

            var ContextOfParse;
            describe('ContextOfParse', function () {
                ContextOfParse = htmlToASTExport.ContextOfParse;

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
                        expect(contextOfParse.state).toBe(states.TEXT);
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

                    it('attributeValue', function () {
                        expect(contextOfParse.attributeValue).toBe('');
                    });

                    it('attributes', function () {
                        expect(contextOfParse.attributes).toBeNull();
                    });

                    it('result', function () {
                        expect(contextOfParse.result instanceof htmlToASTNodes.Fragment).toBeTruthy();
                    });

                    it('treeStack', function () {
                        var treeStack = contextOfParse.treeStack;
                        expect(treeStack).toEqual(jasmine.any(Array));
                        expect(treeStack.length).toBe(1);
                        expect(treeStack[0] instanceof htmlToASTNodes.Fragment).toBeTruthy();
                    });

                    it('isXML mode off', function () {
                        expect(contextOfParse.isXMLMode).toBe(false);
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

            });

            describe('microhelpers', function () {
                //TODO: [dmitry.makhnev] symbols collection
                //TODO: [dmitry.makhnev] numbers collection
                //TODO: [dmitry.makhnev] latin letters collection
                //TODO: [dmitry.makhnev] some letters collection
                //TODO: [dmitry.makhnev] add generations expect with all collections

                describe('isCorrectTagNameStartSymbol', function () {
                    var isCorrectTagNameStartSymbol = htmlToASTExport.isCorrectTagNameStartSymbol;

                    it('letter is letter', function () {
                        expect(isCorrectTagNameStartSymbol('A')).toBeTruthy();
                        expect(isCorrectTagNameStartSymbol('Z')).toBeTruthy();
                        expect(isCorrectTagNameStartSymbol('a')).toBeTruthy();
                        expect(isCorrectTagNameStartSymbol('z')).toBeTruthy();
                        expect(isCorrectTagNameStartSymbol('F')).toBeTruthy();
                        expect(isCorrectTagNameStartSymbol('f')).toBeTruthy();
                    });
                    it('/ is not letter', function () {
                        expect(isCorrectTagNameStartSymbol('/')).toBeFalsy();
                    });
                    it('! is not letter', function () {
                        expect(isCorrectTagNameStartSymbol('!')).toBeFalsy();
                    });
                    it('- is not letter', function () {
                        expect(isCorrectTagNameStartSymbol('-')).toBeFalsy();
                    });
                    it('_ is not letter', function () {
                        expect(isCorrectTagNameStartSymbol('_')).toBeFalsy();
                    });
                    it('\' \' is not letter', function () {
                        expect(isCorrectTagNameStartSymbol(' ')).toBeFalsy();
                    });
                    it('number is not letter', function () {
                        expect(isCorrectTagNameStartSymbol('0')).toBeFalsy();
                        expect(isCorrectTagNameStartSymbol('1')).toBeFalsy();
                        expect(isCorrectTagNameStartSymbol('2')).toBeFalsy();
                        expect(isCorrectTagNameStartSymbol('3')).toBeFalsy();
                        expect(isCorrectTagNameStartSymbol('4')).toBeFalsy();
                        expect(isCorrectTagNameStartSymbol('4')).toBeFalsy();
                        expect(isCorrectTagNameStartSymbol('6')).toBeFalsy();
                        expect(isCorrectTagNameStartSymbol('7')).toBeFalsy();
                        expect(isCorrectTagNameStartSymbol('8')).toBeFalsy();
                        expect(isCorrectTagNameStartSymbol('9')).toBeFalsy();
                    });

                });

                describe('isCorrectTagNameSymbol', function () {
                    var isCorrectTagNameSymbol = htmlToASTExport.isCorrectTagNameSymbol;

                    it('letter is correct', function () {
                        expect(isCorrectTagNameSymbol('A')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('Z')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('a')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('z')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('F')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('f')).toBeTruthy();
                    });
                    it('/ is not correct', function () {
                        expect(isCorrectTagNameSymbol('/')).toBeFalsy();
                    });
                    it('! is not correct', function () {
                        expect(isCorrectTagNameSymbol('!')).toBeFalsy();
                    });
                    it('\' \' is not correct', function () {
                        expect(isCorrectTagNameSymbol(' ')).toBeFalsy();
                    });
                    it('- is correct', function () {
                        expect(isCorrectTagNameSymbol('-')).toBeTruthy();
                    });
                    it('_ is correct', function () {
                        expect(isCorrectTagNameSymbol('_')).toBeTruthy();
                    });
                    it('number is correct', function () {
                        expect(isCorrectTagNameSymbol('0')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('1')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('2')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('3')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('4')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('4')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('6')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('7')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('8')).toBeTruthy();
                        expect(isCorrectTagNameSymbol('9')).toBeTruthy();
                    });
                });

                describe('isWhiteSpace', function () {
                    var isWhiteSpace = htmlToASTExport.isWhiteSpace;

                    it('letters is incorrect', function () {
                        expect(isWhiteSpace('A')).toBeFalsy();
                        expect(isWhiteSpace('Z')).toBeFalsy();
                        expect(isWhiteSpace('a')).toBeFalsy();
                        expect(isWhiteSpace('z')).toBeFalsy();
                        expect(isWhiteSpace('F')).toBeFalsy();
                        expect(isWhiteSpace('f')).toBeFalsy();
                    });

                    it('symbols is incorrect', function () {
                        expect(isWhiteSpace(',')).toBeFalsy();
                        expect(isWhiteSpace('>')).toBeFalsy();
                        expect(isWhiteSpace('!')).toBeFalsy();
                        expect(isWhiteSpace('-')).toBeFalsy();
                        expect(isWhiteSpace('_')).toBeFalsy();
                        expect(isWhiteSpace('(')).toBeFalsy();
                        expect(isWhiteSpace('}')).toBeFalsy();
                    });

                    it('numbers is incorrect', function () {
                        expect(isWhiteSpace('1')).toBeFalsy();
                        expect(isWhiteSpace('3')).toBeFalsy();
                        expect(isWhiteSpace('6')).toBeFalsy();
                        expect(isWhiteSpace('0')).toBeFalsy();
                    });

                    it('\' \' is correct', function () {
                        expect(isWhiteSpace(' ')).toBeTruthy();
                    });
                    it('\'\\n\' is correct', function () {
                        expect(isWhiteSpace('\n')).toBeTruthy();
                    });
                    it('\'\\t\' is correct', function () {
                        expect(isWhiteSpace('\t')).toBeTruthy();
                    });
                    it('\'\\r\' is correct', function () {
                        expect(isWhiteSpace('\r')).toBeTruthy();
                    });
                    it('\'\\f\' is correct', function () {
                        expect(isWhiteSpace('\f')).toBeTruthy();
                    });

                });

            });

            var builders;
            describe('builders', function () {
                builders = htmlToASTExport.builders;

                it('builders was exported', function () {
                    expect(builders).toBeDefined();
                });

                describe('buildText', function () {
                    var buildText = builders.buildText;

                    it('was exported', function () {
                        expect(buildText).toBeDefined();
                    });

                    describe('build text only', function () {
                        var contextOfParse = new ContextOfParse();
                        contextOfParse.buffer = 'hello';
                        contextOfParse.state = states.TEXT;
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
                            expect(contextOfParse.treeStack[0] instanceof  htmlToASTNodes.Fragment).toBeTruthy();
                        });

                        describe('building Text', function () {
                            it('correct position', function () {
                                expect(contextOfParse.result.childNodes[0] instanceof htmlToASTNodes.Text).toBeTruthy();
                            });
                            it('correct Text.text', function () {
                                expect(contextOfParse.result.childNodes[0].text).toBe('hello');
                            });
                        });

                    });

                });

                describe('buildTag', function () {
                    var buildTag = builders.buildTag;
                    it('was exported', function () {
                        expect(buildTag).toBeDefined();
                    });

                    describe('build tag without nesting and attributes', function () {
                        var contextOfParse = new ContextOfParse();
                        contextOfParse.buffer = 'a<br>';
                        contextOfParse.state = states.TAG_NAME;
                        contextOfParse.textBuffer = 'a';
                        contextOfParse.tagName = 'br';
                        buildTag(contextOfParse);

                        it('contextOfParse.buffer is clean', function () {
                            expect(contextOfParse.buffer).toBe('');
                        });

                        it('contextOfParse.textBuffer is clean', function () {
                            expect(contextOfParse.textBuffer).toBe('');
                        });

                        it('contextOfParse.tagName is clean', function () {
                            expect(contextOfParse.tagName).toBe('');
                        });

                        it('correct contextOfParse.state', function () {
                            expect(contextOfParse.state).toBe(states.TEXT);
                        });

                        it('correct contextOfParse.stack state', function () {
                            expect(contextOfParse.treeStack[1]).toBeUndefined();
                            expect(contextOfParse.treeStack[0] instanceof  htmlToASTNodes.Fragment).toBeTruthy();
                        });

                        describe('building Text', function () {
                            it('correct position', function () {
                                expect(contextOfParse.result.childNodes[0] instanceof htmlToASTNodes.Text).toBeTruthy();
                            });
                            it('correct Text.text', function () {
                                expect(contextOfParse.result.childNodes[0].text).toBe('a');
                            });
                        });
                        describe('building Tag', function () {
                            it('correct position', function () {
                                expect(contextOfParse.result.childNodes[1] instanceof htmlToASTNodes.Tag).toBeTruthy();
                            });
                            it('correct Text.text', function () {
                                expect(contextOfParse.result.childNodes[1].name).toBe('br');
                            });
                        });
                    });

                    describe('build tag with attributes', function () {
                        var contextOfParse = new ContextOfParse();
                        contextOfParse.buffer = 'a<hr class="className" id="id">';
                        contextOfParse.state = states.TAG_NAME;
                        contextOfParse.textBuffer = 'a';
                        contextOfParse.tagName = 'hr';
                        contextOfParse.attributes = {
                            'class': 'className',
                            id: 'id'
                        };
                        buildTag(contextOfParse);

                        it('contextOfParse.attributes is clean', function () {
                            expect(contextOfParse.attributes).toBeNull();
                        });

                        it('tag has correct attributes', function () {
                            var hrTag = contextOfParse.result.childNodes[1];
                            expect(hrTag.attributes['class']).toBe('className');
                            expect(hrTag.attributes.id).toBe('id');
                        });
                    });

                });
            });

            var processings;
            describe('processings', function () {
                processings = htmlToASTExport.processings;

                it('was exported', function () {
                    expect(processings).toBeDefined();
                });

                describe('processingText', function () {
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
                            expect(contextOfParse.state).toBe(states.TAG_START);
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
                            expect(contextOfParse.state).toBe(states.TEXT);
                        });
                        processingText(contextOfParse, '/');
                        it('save TEXT state after processing \'/\'', function () {
                            expect(contextOfParse.state).toBe(states.TEXT);
                        });
                        processingText(contextOfParse, 'ф');
                        it('save TEXT state after processing \'ф\'', function () {
                            expect(contextOfParse.state).toBe(states.TEXT);
                        });
                        processingText(contextOfParse, '1');
                        it('save TEXT state after processing \'1\'', function () {
                            expect(contextOfParse.state).toBe(states.TEXT);
                        });
                    });

                });

                describe('processingTagStart', function () {
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
                                    expect(contextOfParse.state).toBe(states.TEXT);
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
                                    expect(contextOfParse.state).toBe(states.TEXT);
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
                                    expect(contextOfParse.state).toBe(states.TEXT);
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
                                    expect(contextOfParse.state).toBe(states.TEXT);
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
                                expect(contextOfParse.state).toBe(states.TAG_NAME);
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

                        describe('to DECLARATION_START', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, '!');

                            it('contextOfParse.state is DECLARATION_START', function () {
                                expect(contextOfParse.state).toBe(states.DECLARATION_START);
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

                describe('processingTagName', function () {
                    var processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart,
                        processingTagName = processings.processingTagName;

                    it('was exported', function () {
                        expect(processingTagName).toBeDefined();
                    });

                    describe('change state', function () {

                        describe('to TEXT', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 's');
                            processingTagName(contextOfParse, '*');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });
                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<s*');
                            });
                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a<s*');
                            });
                        });

                        describe('to TEXT when tag close after name with \'>\' and  without \'/\'', function () {
                            describe('tag without nesting', function () {
                                var contextOfParse = new ContextOfParse();

                                processingText(contextOfParse, 'a');
                                processingText(contextOfParse, '<');
                                processingTagStart(contextOfParse, 'b');
                                processingTagName(contextOfParse, 'r');
                                processingTagName(contextOfParse, '>');

                                it('contextOfParse.state is TEXT', function () {
                                    expect(contextOfParse.state).toBe(states.TEXT);
                                });
                                it('contextOfParse.buffer is correct', function () {
                                    expect(contextOfParse.buffer).toBe('');
                                });
                                it('contextOfParse.textBuffer is correct', function () {
                                    expect(contextOfParse.textBuffer).toBe('');
                                });
                                it('contextOfParse.textBuffer is correct', function () {
                                    expect(contextOfParse.tagName).toBe('');
                                });

                                describe('textNode', function () {
                                    var textNode = contextOfParse.result.childNodes[0];
                                    it('is define', function () {
                                        expect(textNode).toBeDefined();
                                    });
                                    it('is TextNode', function () {
                                        expect(textNode instanceof htmlToASTNodes.Text).toBeTruthy();
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
                                        expect(tag instanceof htmlToASTNodes.Tag).toBeTruthy();
                                    });
                                    it('correct textNode.text', function () {
                                        expect(tag.name).toBe('br');
                                    });
                                    it('not add to contextOfParse.treeStack', function () {
                                        var treeStack = contextOfParse.treeStack;
                                        expect(treeStack.length).toBe(1);
                                        expect(treeStack[0]).toBe(contextOfParse.result);
                                    });
                                });
                            });

                            describe('common tag', function () {
                                var contextOfParse = new ContextOfParse();

                                processingText(contextOfParse, 'a');
                                processingText(contextOfParse, '<');
                                processingTagStart(contextOfParse, 'd');
                                processingTagName(contextOfParse, 'i');
                                processingTagName(contextOfParse, 'v');
                                processingTagName(contextOfParse, '>');

                                it('contextOfParse.state is TEXT', function () {
                                    expect(contextOfParse.state).toBe(states.TEXT);
                                });
                                it('contextOfParse.buffer is correct', function () {
                                    expect(contextOfParse.buffer).toBe('');
                                });
                                it('contextOfParse.textBuffer is correct', function () {
                                    expect(contextOfParse.textBuffer).toBe('');
                                });
                                it('contextOfParse.textBuffer is correct', function () {
                                    expect(contextOfParse.tagName).toBe('');
                                });

                                describe('textNode', function () {
                                    var textNode = contextOfParse.result.childNodes[0];
                                    it('is define', function () {
                                        expect(textNode).toBeDefined();
                                    });
                                    it('is TextNode', function () {
                                        expect(textNode instanceof htmlToASTNodes.Text).toBeTruthy();
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
                                        expect(tag instanceof htmlToASTNodes.Tag).toBeTruthy();
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
                                });
                            });
                        });

                        describe('to TAG_BODY', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 's');
                            processingTagName(contextOfParse, 't');
                            processingTagName(contextOfParse, ' ');

                            it('contextOfParse.state is TAG_BODY', function () {
                                expect(contextOfParse.state).toBe(states.TAG_BODY);
                            });
                            it('correct contextOfParse.buffer', function () {
                                expect(contextOfParse.buffer).toBe('a<st ');
                            });
                            it('correct contextOfParse.textBuffer', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });
                            it('correct contextOfParse.tagName', function () {
                                expect(contextOfParse.tagName).toBe('st');
                            });
                        });

                        describe('to TAG_CLOSE', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 's');
                            processingTagName(contextOfParse, 't');
                            processingTagName(contextOfParse, '/');

                            it('contextOfParse.state is TAG_CLOSE', function () {
                                expect(contextOfParse.state).toBe(states.TAG_CLOSE);
                            });
                            it('correct contextOfParse.buffer', function () {
                                expect(contextOfParse.buffer).toBe('a<st/');
                            });
                            it('correct contextOfParse.textBuffer', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });
                            it('correct contextOfParse.tagName', function () {
                                expect(contextOfParse.tagName).toBe('st');
                            });
                        });

                    });
                });




            });

        });

        it('any AST root is Fragment', function () {
            var ast = htmlToAST.parse('');
            expect(ast instanceof htmlToASTNodes.Fragment).toBeTruthy();
        });

        describe('one span', function () {

            var ast = htmlToAST.parse(createDefaultSpan()),
                span = ast.childNodes[0];

            defaultDivTests(span);

        });

        describe('one div with attributes', function () {

            var ast = htmlToAST.parse(createDefaultDiv()),
                div = ast.childNodes[0];

            defaultDivTests(div);

        });


        describe('2 linear tags', function () {

            var ast = htmlToAST.parse(createDefaultSpan() + createDefaultDiv()),
                span = ast.childNodes[0],
                div = ast.childNodes[1];

            describe('span', function () {
                defaultSpanTests(span);
            });

            describe('div', function () {
                defaultDivTests(div);
            });

        });

        describe('2 nested divs', function () {
            var ast = htmlToAST.parse(createDefaultDiv(createDefaultDiv())),
                div1 = ast.childNodes[0],
                div2 = ast.childNodes[0].childNodes[0];

            describe('parent div', function () {
                defaultDivTests(div1);
            });

            describe('children div', function () {
                defaultDivTests(div2);
            });

        })

    });



});