describe('DL.htmlToAST', function () {

    var htmlToAST = DL.htmlToAST;

    describe('correct define', function () {
        describe('module', function () {
            it('is defined', function () {
                expect(htmlToAST).toBeDefined();
            });

            it('is Object', function () {
                expect(htmlToAST).toEqual(jasmine.any(Object));
            });
        });
        describe('module parts', function () {

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

            it('helpers is define', function () {
                expect(htmlToAST.helpers).toBeDefined();
            });

            it('helpers is object', function () {
                expect(htmlToAST.helpers).toEqual(jasmine.any(Object));
            });
        });


    });

    var htmlToASTNodes = htmlToAST.nodes,
        htmlToASTHelpers = htmlToAST.helpers;

    describe('nodes instances construct and api', function () {

        describe('Fragment', function () {

            it('is define', function () {
                expect(htmlToASTNodes.Fragment).toBeDefined();
            });

            it('is constructor', function () {
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

            it('is define', function () {
                expect(htmlToASTNodes.Tag).toBeDefined();
            });

            it('is constructor', function () {
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

            it('parentNode is define', function () {
                expect(tag.parentNode).toBeDefined();
            });

            it('parentNode is null', function () {
                expect(tag.parentNode).toBeNull();
            });
        });


        describe('Text', function () {

            it('is define', function () {
                expect(htmlToASTNodes.Text).toBeDefined();
            });

            it('is constructor', function () {
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

            it('parentNode is define', function () {
                expect(text.parentNode).toBeDefined();
            });

            it('parentNode is null', function () {
                expect(text.parentNode).toBeNull();
            });

        });


        describe('Comment', function () {

            it('is define', function () {
                expect(htmlToASTNodes.Comment).toBeDefined();
            });

            it('is constructor', function () {
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

            it('parentNode is define', function () {
                expect(comment.parentNode).toBeDefined();
            });

            it('parentNode is null', function () {
                expect(comment.parentNode).toBeNull();
            });

        });

    });

    describe('helpers api', function () {
        var helpers = htmlToAST.helpers;

        describe('appendChild()', function () {
            it('is defined', function () {
                expect(helpers.appendChild).toBeDefined();
            });

            it('is function', function () {
                expect(helpers.appendChild).toEqual(jasmine.any(Function));
            });

            describe('appendChild() div into fragment', function () {
                var fragment = new htmlToASTNodes.Fragment(),
                    div = new htmlToASTNodes.Tag('div', {'class': 'block'});

                htmlToASTHelpers.appendChild(fragment, div);
                it('correct div position', function () {
                    expect(fragment.childNodes[0]).toBe(div);
                });
                it('div.parentNode is fragment', function () {
                    expect(div.parentNode).toBe(fragment);
                });

            });

            describe('appendChild() reappend div', function () {
                var div = new htmlToASTNodes.Tag('div'),
                    div2 = new htmlToASTNodes.Tag('div'),
                    fragment = new htmlToASTNodes.Fragment();

                htmlToASTHelpers.appendChild(div2, div);
                htmlToASTHelpers.appendChild(fragment, div);

                it('div correct parent node', function () {
                    expect(div.parentNode).toBe(fragment);
                });

                it('div2.childNodes is correct', function () {
                    expect(div2.childNodes.length).toBe(0);
                });

            });

            describe('appendChild() for fragment', function () {
                var div = new htmlToASTNodes.Tag('div'),
                    div2 = new htmlToASTNodes.Tag('div'),
                    div3 = new htmlToASTNodes.Tag('div'),
                    fragment = new htmlToASTNodes.Fragment();

                htmlToASTHelpers.appendChild(fragment, div2);
                htmlToASTHelpers.appendChild(fragment, div3);
                htmlToASTHelpers.appendChild(div, fragment);

                it('div.childNodes length is correct', function () {
                    expect(div.childNodes.length).toBe(2);
                });

                it('div2.parentNode is div', function () {
                    expect(div2.parentNode).toBe(div);
                });

                it('div3.parentNode is div', function () {
                    expect(div3.parentNode).toBe(div);
                });

                it('fragment.childNodes is empty', function () {
                    expect(fragment.childNodes.length).toBe(0);
                });
            });

        });

        describe('removeChild()', function () {

            it('is define', function () {
                expect(htmlToASTHelpers.removeChild).toBeDefined();
            });
            it('is function', function () {
                expect(htmlToASTHelpers.removeChild).toEqual(jasmine.any(Function));
            });

            describe('simple remove', function () {
                var div = new htmlToASTNodes.Tag('div'),
                    div2 = new htmlToASTNodes.Tag('div');

                htmlToASTHelpers.appendChild(div, div2);
                htmlToASTHelpers.removeChild(div, div2);

                it('div.childNodes is empty', function () {
                    expect(div.childNodes.length).toBe(0);
                });

                it('div2.parentNode is null', function () {
                    expect(div2.parentNode).toBeNull();
                });
            });

            describe('remove second of three nodes', function () {
                var div = new htmlToASTNodes.Tag('div'),
                    div1 = new htmlToASTNodes.Tag('div'),
                    div2 = new htmlToASTNodes.Tag('div'),
                    div3 = new htmlToASTNodes.Tag('div');

                htmlToASTHelpers.appendChild(div, div1);
                htmlToASTHelpers.appendChild(div, div2);
                htmlToASTHelpers.appendChild(div, div3);
                htmlToASTHelpers.removeChild(div, div2);

                it('div.childNodes length is 2', function () {
                    expect(div.childNodes.length).toBe(2);
                });

                it('div.childNodes[0] is div1', function () {
                    expect(div.childNodes[0]).toBe(div1);
                });

                it('div.childNodes[1] is div3', function () {
                    expect(div.childNodes[1]).toBe(div3);
                });

                it('div2.parentNode is null', function () {
                    expect(div2.parentNode).toBeNull();
                });

            });

        });
    });


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

            describe('microhelpers', function () {
                //TODO: [dmitry.makhnev] symbols collection
                //TODO: [dmitry.makhnev] numbers collection
                //TODO: [dmitry.makhnev] latin letters collection
                //TODO: [dmitry.makhnev] some letters collection
                //TODO: [dmitry.makhnev] add generations expect with all collections

                describe('isCorrectTagNameStartSymbol', function () {
                    var isCorrectTagNameStartSymbol = htmlToASTExport.isCorrectTagNameStartSymbol;

                    it('was exported', function () {
                        expect(isCorrectTagNameStartSymbol).toBeDefined();
                    });

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

                    it('was exported', function () {
                        expect(isCorrectTagNameSymbol).toBeDefined();
                    });

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

                    it('was exported', function () {
                        expect(isWhiteSpace).toBeDefined();
                    });

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

                describe('isSingletonHTMLTag', function () {
                    var isSingletonHTMLTag = htmlToASTExport.isSingletonHTMLTag;

                    it('was exported', function () {
                        expect(isSingletonHTMLTag).toBeDefined();
                    });

                    it('<img> is singleton tag', function () {
                        expect(isSingletonHTMLTag('img')).toBeTruthy();
                    });
                    it('<input> is singleton tag', function () {
                        expect(isSingletonHTMLTag('input')).toBeTruthy();
                    });
                    it('<br> is singleton tag', function () {
                        expect(isSingletonHTMLTag('br')).toBeTruthy();
                    });
                    it('<hr> is singleton tag', function () {
                        expect(isSingletonHTMLTag('hr')).toBeTruthy();
                    });
                    it('<link> is singleton tag', function () {
                        expect(isSingletonHTMLTag('link')).toBeTruthy();
                    });
                    it('<meta> is singleton tag', function () {
                        expect(isSingletonHTMLTag('meta')).toBeTruthy();
                    });
                    it('<source> is singleton tag', function () {
                        expect(isSingletonHTMLTag('source')).toBeTruthy();
                    });
                    it('<area> is singleton tag', function () {
                        expect(isSingletonHTMLTag('area')).toBeTruthy();
                    });
                    it('<embed> is singleton tag', function () {
                        expect(isSingletonHTMLTag('embed')).toBeTruthy();
                    });
                    it('<param> is singleton tag', function () {
                        expect(isSingletonHTMLTag('param')).toBeTruthy();
                    });
                    it('<base> is singleton tag', function () {
                        expect(isSingletonHTMLTag('base')).toBeTruthy();
                    });
                    it('<col> is singleton tag', function () {
                        expect(isSingletonHTMLTag('col')).toBeTruthy();
                    });
                    it('<command> is singleton tag', function () {
                        expect(isSingletonHTMLTag('command')).toBeTruthy();
                    });

                    it('<div> is not singleton tag', function () {
                        expect(isSingletonHTMLTag('div')).toBeFalsy();
                    });
                    it('<span> is not singleton tag', function () {
                        expect(isSingletonHTMLTag('span')).toBeFalsy();
                    });
                    it('<ul> is not singleton tag', function () {
                        expect(isSingletonHTMLTag('ul')).toBeFalsy();
                    });
                });

                describe('isCorrectAttributeNameStartSymbol', function () {
                    var isCorrectAttributeNameStartSymbol = htmlToASTExport.isCorrectAttributeNameStartSymbol;

                    it('was exported', function () {
                        expect(isCorrectAttributeNameStartSymbol).toBeDefined();
                    });

                    it('is isCorrectTagNameStartSymbol', function () {
                        expect(isCorrectAttributeNameStartSymbol).toBe(htmlToASTExport.isCorrectTagNameStartSymbol);
                    })
                });

                describe('isCorrectAttributeNameSymbol', function () {
                    var isCorrectAttributeNameSymbol = htmlToASTExport.isCorrectAttributeNameSymbol;

                    it('was exported', function () {
                        expect(isCorrectAttributeNameSymbol).toBeDefined();
                    });

                    it('is isCorrectTagNameStartSymbol', function () {
                        expect(isCorrectAttributeNameSymbol).toBe(htmlToASTExport.isCorrectTagNameSymbol);
                    })
                });

                describe('addCharForBuffer', function () {
                    var addCharForBuffer = htmlToASTExport.addCharForBuffer;

                    it('was exported', function () {
                        expect(addCharForBuffer).toBeDefined();
                    });

                    var contextOfParse = new ContextOfParse();

                    addCharForBuffer(contextOfParse, ' ');
                    addCharForBuffer(contextOfParse, '\n');
                    addCharForBuffer(contextOfParse, ' ');
                    addCharForBuffer(contextOfParse, '\r');
                    addCharForBuffer(contextOfParse, '\r');
                    addCharForBuffer(contextOfParse, 'a');

                    it('contextOfParse.buffer correct', function () {
                        expect(contextOfParse.buffer).toBe(' \n \r\ra');
                    });

                });

                describe('clearForTextState', function () {
                    var clearForTextState = htmlToASTExport.clearForTextState;

                    it('was exported', function () {
                        expect(clearForTextState).toBeDefined();
                    });

                    var contextOfParse = new ContextOfParse();
                    contextOfParse.buffer = 'a<div class="asd"\\';
                    contextOfParse.textBuffer = 'a';
                    contextOfParse.tagName = 'div';
                    contextOfParse.attributes = {
                        'class': 'asd'
                    };

                    clearForTextState(contextOfParse);

                    it('contextOfParse.buffer is correct', function () {
                        expect(contextOfParse.buffer).toBe('a<div class="asd"\\');
                    });

                    it('contextOfParse.textBuffer is correct', function () {
                        expect(contextOfParse.textBuffer).toBe('a<div class="asd"\\');
                    });

                    //TODO: [dmitry.makhnev] think about other properties


                });

                describe('addAttribute', function () {
                    var addAttribute = htmlToASTExport.addAttribute;

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

                    //some HTML tags define as simple. for example <img>, <input>, <br>, <hr>, <link>, <meta>
                    describe('build simple tag without nesting and attributes', function () {
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

                        it('correct contextOfParse.state', function () {
                            expect(contextOfParse.state).toBe(states.TEXT);
                        });

                        it('correct contextOfParse.treeStack state', function () {
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

                    describe('build simple tag with attributes', function () {
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

                        it('tag has correct attributes', function () {
                            var hrTag = contextOfParse.result.childNodes[1];
                            expect(hrTag.attributes['class']).toBe('className');
                            expect(hrTag.attributes.id).toBe('id');
                        });
                    });

                    describe('build tag with nesting', function () {
                        var contextOfParse = new ContextOfParse();
                        contextOfParse.buffer = '<div>';
                        contextOfParse.state = states.TAG_NAME;
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
                        contextOfParse.state = states.TAG_NAME;
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
                        contextOfParse.state = states.TAG_NAME;
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
                        contextOfParse.state = states.TAG_NAME;
                        contextOfParse.tagName = 'br';
                        buildTag(contextOfParse, true);

                        it('correct treeStack position', function () {
                            var treeStack = contextOfParse.treeStack;
                            expect(treeStack.length).toBe(1);
                        });

                    });

                });

                describe('closeTag', function () {
                    var closeTag = builders.closeTag;

                    it('was exported', function () {
                        expect(closeTag).toBeDefined();
                    });

                    describe('simple situation for one tag', function () {
                        var contextOfParse = new ContextOfParse();
                        contextOfParse.buffer = 'hello</div>';
                        contextOfParse.textBuffer = 'hello';
                        contextOfParse.tagName = 'div';
                        contextOfParse.state = states.CLOSED_TAG_NAME;

                        var tag = new htmlToASTNodes.Tag('div'),
                            treeStack = contextOfParse.treeStack;
                        htmlToASTHelpers.appendChild(treeStack[treeStack.length - 1], tag);
                        treeStack.push(tag);

                        closeTag(contextOfParse);

                        it('contextOfParse.state is TEXT', function () {
                            expect(contextOfParse.state).toBe(states.TEXT);
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
                        contextOfParse.state = states.CLOSED_TAG_NAME;

                        var treeStack = contextOfParse.treeStack;

                        var div = new htmlToASTNodes.Tag('div');
                        htmlToASTHelpers.appendChild(treeStack[treeStack.length - 1], div);
                        treeStack.push(div);

                        var span = new htmlToASTNodes.Tag('span');
                        htmlToASTHelpers.appendChild(treeStack[treeStack.length - 1], span);
                        treeStack.push(span);

                        closeTag(contextOfParse);

                        it('contextOfParse.state is TEXT', function () {
                            expect(contextOfParse.state).toBe(states.TEXT);
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

                describe('buildComment', function () {
                    var buildComment = builders.buildComment;

                    it('is define', function () {
                        expect(buildComment).toBeDefined();
                    });

                    it('is function', function () {
                        expect(buildComment).toEqual(jasmine.any(Function));
                    });

                    describe('build', function () {
                        var contextOfParse = new ContextOfParse();
                        contextOfParse.buffer = 'a<!--hello--';
                        contextOfParse.textBuffer = 'a';
                        contextOfParse.commentBuffer = 'hello';
                        buildComment(contextOfParse);

                        describe('contextOfParse', function () {
                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('');
                            });
                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('');
                            });
                        });

                        describe('TextNode', function () {
                            var textNode = contextOfParse.result.childNodes[0];

                            it('is define', function () {
                                expect(textNode).toBeDefined();
                            });

                            it('is Text', function () {
                                expect(textNode instanceof htmlToASTNodes.Text).toBeTruthy();
                            });

                            it('textNode.text is correct', function () {
                                expect(textNode.text).toBe('a');
                            });
                        });

                        describe('Comment', function () {
                            var comment = contextOfParse.result.childNodes[1];

                            it('is define', function () {
                                expect(comment).toBeDefined();
                            });

                            it('is Comment', function () {
                                expect(comment instanceof htmlToASTNodes.Comment).toBeTruthy();
                            });

                            it('comment.text is correct', function () {
                                expect(comment.text).toBe('hello');
                            });
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

                        describe('to CLOSED_TAG_START', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, '/');

                            it('contextOfParse.state is CLOSED_TAG_START', function () {
                                expect(contextOfParse.state).toBe(states.CLOSED_TAG_START);
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
                                    it('is Tag', function () {
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

                describe('processingTagBody', function () {
                    var processingTagBody = processings.processingTagBody,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart,
                        processingTagName = processings.processingTagName;

                    it('was exported', function () {
                        expect(processingTagBody).toBeDefined();
                    });

                    describe('change state', function () {

                        describe('to TEXT when incorrect tag body symbol', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, ' ');
                            processingTagBody(contextOfParse, '\\');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div \\');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a<div \\');
                            });

                        });

                        describe('to TEXT when symbol is \'>\'', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, '\t');
                            processingTagBody(contextOfParse, '>');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });
                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('');
                            });
                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('');
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

                        describe('to TAG_CLOSE', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, '\r');
                            processingTagBody(contextOfParse, '/');

                            it('contextOfParse.state is TAG_CLOSE', function () {
                                expect(contextOfParse.state).toBe(states.TAG_CLOSE);
                            });
                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div\r/');
                            });
                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });
                            it('contextOfParse.tagName is correct', function () {
                                expect(contextOfParse.tagName).toBe('div');
                            });
                        });

                        describe('to TAG_ATTRIBUTE_NAME', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, ' ');
                            processingTagBody(contextOfParse, '\n');
                            processingTagBody(contextOfParse, 'a');

                            it('contextOfParse.state is TAG_ATTRIBUTE_NAME', function () {
                                expect(contextOfParse.state).toBe(states.TAG_ATTRIBUTE_NAME);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div \na');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });

                            it('contextOfParse.tagName is correct', function () {
                                expect(contextOfParse.tagName).toBe('div');
                            });

                            it('contextOfParse.attributeName is correct', function () {
                                expect(contextOfParse.attributeName).toBe('a');
                            });



                        });

                    });

                });

                describe('processingTagAttributeName', function () {
                    var processingTagAttributeName = processings.processingTagAttributeName,
                        processingTagBody = processings.processingTagBody,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart,
                        processingTagName = processings.processingTagName;

                    it('was exported', function () {
                        expect(processingTagAttributeName).toBeDefined();
                    });

                    describe('change state', function () {
                        describe('to TEXT when incorrect symbol', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, ' ');
                            processingTagBody(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, '\\');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div a\\');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a<div a\\');
                            });
                        });

                        describe('to TAG_ATTRIBUTE_TO_VALUE', function () {
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
                            processingTagAttributeName(contextOfParse, '-');
                            processingTagAttributeName(contextOfParse, 'a');
                            processingTagAttributeName(contextOfParse, '=');

                            it('contextOfParse.state is TAG_ATTRIBUTE_TO_VALUE', function () {
                                expect(contextOfParse.state).toBe(states.TAG_ATTRIBUTE_TO_VALUE);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div data-a=');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });

                            it('contextOfParse.attributeName is correct', function () {
                                expect(contextOfParse.attributeName).toBe('data-a');
                            });
                        });
                    });
                });

                describe('processingTagAttributeToValue', function () {
                    var processingTagAttributeToValue = processings.processingTagAttributeToValue,
                        processingTagAttributeName = processings.processingTagAttributeName,
                        processingTagBody = processings.processingTagBody,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart,
                        processingTagName = processings.processingTagName;

                    it('was exported', function () {
                        expect(processingTagAttributeToValue).toBeDefined();
                    });

                    describe('change state', function () {
                        describe('to TEXT when incorrect symbol', function () {
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
                            processingTagAttributeToValue(contextOfParse, '|');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div data=|');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a<div data=|');
                            });
                        });

                        describe('to TEXT when tag closed', function () {
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
                            processingTagAttributeName(contextOfParse, '>');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('');
                            });

                            it('contextOfParse.attributeName is correct', function () {
                                expect(contextOfParse.attributeName).toBe('data');
                            });

                            it('attributes is object', function () {
                                expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
                            });

                            it('attribute defined', function () {
                                expect(contextOfParse.attributes['data']).toBeDefined();
                            });

                            it('attribute has correct value', function () {
                                expect(contextOfParse.attributes['data']).toBe('');
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

                                it('attributes is object', function () {
                                    expect(tag.attributes).toEqual(jasmine.any(Object));
                                });

                                it('attribute defined', function () {
                                    expect(tag.attributes['data']).toBeDefined();
                                });

                                it('attribute has correct value', function () {
                                    expect(tag.attributes['data']).toBe('');
                                });
                            });

                        });

                        describe('to TAG_ATTRIBUTE_VALUE for \'\'\'', function () {
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
                            processingTagAttributeToValue(contextOfParse, '\'');

                            it('contextOfParse.state is TAG_ATTRIBUTE_VALUE', function () {
                                expect(contextOfParse.state).toBe(states.TAG_ATTRIBUTE_VALUE);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div data=\'');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });

                            it('contextOfParse.attributeName is correct', function () {
                                expect(contextOfParse.attributeName).toBe('data');
                            });

                            it('contextOfParse.attributeValueSeparator is correct', function () {
                                expect(contextOfParse.attributeValueSeparator).toBe('\'');
                            });

                            it('contextOfParse.attributeValueSeparator is correct', function () {
                                expect(contextOfParse.attributeValue).toBe('');
                            });
                        });

                        describe('to TAG_ATTRIBUTE_VALUE for \'"\'', function () {
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

                            it('contextOfParse.state is TAG_ATTRIBUTE_VALUE', function () {
                                expect(contextOfParse.state).toBe(states.TAG_ATTRIBUTE_VALUE);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div data="');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });

                            it('contextOfParse.attributeName is correct', function () {
                                expect(contextOfParse.attributeName).toBe('data');
                            });

                            it('contextOfParse.attributeValueSeparator is correct', function () {
                                expect(contextOfParse.attributeValueSeparator).toBe('"');
                            });

                            it('contextOfParse.attributeName is correct', function () {
                                expect(contextOfParse.attributeValue).toBe('');
                            });
                        });

                        describe('to TAG_BODY for attribute without value', function () {
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
                            processingTagAttributeName(contextOfParse, ' ');

                            it('contextOfParse.state is TAG_BODY', function () {
                                expect(contextOfParse.state).toBe(states.TAG_BODY);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div data ');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });

                            it('contextOfParse.attributeName is correct', function () {
                                expect(contextOfParse.attributeName).toBe('data');
                            });

                            it('attributes is object', function () {
                                expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
                            });
                            it('attribute defined', function () {
                                expect(contextOfParse.attributes['data']).toBeDefined();
                            });
                            it('attribute has correct value', function () {
                                expect(contextOfParse.attributes['data']).toBe('');
                            });


                        });

                        describe('to TAG_CLOSE for attribute without value', function () {
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
                            processingTagAttributeName(contextOfParse, '/');

                            it('contextOfParse.state is TAG_CLOSE', function () {
                                expect(contextOfParse.state).toBe(states.TAG_CLOSE);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div data/');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a');
                            });

                            it('contextOfParse.attributeName is correct', function () {
                                expect(contextOfParse.attributeName).toBe('data');
                            });

                            it('attributes is object', function () {
                                expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
                            });
                            it('attribute defined', function () {
                                expect(contextOfParse.attributes['data']).toBeDefined();
                            });
                            it('attribute has correct value', function () {
                                expect(contextOfParse.attributes['data']).toBe('');
                            });

                        });
                    });
                });

                describe('processingTagAttributeValue', function () {
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
                                expect(contextOfParse.state).toBe(states.TAG_ATTRIBUTE_VALUE_END);
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

                describe('processingAttributeValueEnd', function () {
                    var processingAttributeValueEnd = processings.processingAttributeValueEnd,
                        processingTagAttributeValue = processings.processingTagAttributeValue,
                        processingTagAttributeToValue = processings.processingTagAttributeToValue,
                        processingTagAttributeName = processings.processingTagAttributeName,
                        processingTagBody = processings.processingTagBody,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart,
                        processingTagName = processings.processingTagName;

                    it('was exported', function () {
                        expect(processingAttributeValueEnd).toBeDefined();
                    });

                    describe('change state', function () {
                        describe('to TEXT when incorrect symbol', function () {
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
                            processingAttributeValueEnd(contextOfParse, '.');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div data="a".');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a<div data="a".');
                            });

                        });

                        describe('to TEXT when \'>\' after attributeValueSeparator', function () {
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
                            processingAttributeValueEnd(contextOfParse, '>');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('');
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

                                it('attributes is object', function () {
                                    expect(tag.attributes).toEqual(jasmine.any(Object));
                                });

                                it('attribute defined', function () {
                                    expect(tag.attributes['data']).toBeDefined();
                                });

                                it('attribute has correct value', function () {
                                    expect(tag.attributes['data']).toBe('a');
                                });
                            });

                        });

                        describe('to TAG_BODY', function () {
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
                            processingAttributeValueEnd(contextOfParse, '\t');

                            it('contextOfParse.state is TAG_BODY', function () {
                                expect(contextOfParse.state).toBe(states.TAG_BODY);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div data="a"\t');
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

                        describe('to TAG_CLOSE', function () {
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
                            processingAttributeValueEnd(contextOfParse, '/');

                            it('contextOfParse.state is TAG_CLOSE', function () {
                                expect(contextOfParse.state).toBe(states.TAG_CLOSE);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<div data="a"/');
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

                describe('processing 2 attributes', function () {
                    var processingAttributeValueEnd = processings.processingAttributeValueEnd,
                        processingTagAttributeValue = processings.processingTagAttributeValue,
                        processingTagAttributeToValue = processings.processingTagAttributeToValue,
                        processingTagAttributeName = processings.processingTagAttributeName,
                        processingTagBody = processings.processingTagBody,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart,
                        processingTagName = processings.processingTagName;

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
                    processingAttributeValueEnd(contextOfParse, ' ');
                    processingTagBody(contextOfParse, 'i');
                    processingTagAttributeName(contextOfParse, 'd');
                    processingTagAttributeName(contextOfParse, '=');
                    processingTagAttributeToValue(contextOfParse, '\'');
                    processingTagAttributeValue(contextOfParse, 'b');
                    processingTagAttributeValue(contextOfParse, '\'');
                    processingAttributeValueEnd(contextOfParse, ' ');

                    it('contextOfParse.state is TAG_BODY', function () {
                        expect(contextOfParse.state).toBe(states.TAG_BODY);
                    });

                    it('contextOfParse.buffer is correct', function () {
                        expect(contextOfParse.buffer).toBe('a<div data="a" id=\'b\' ');
                    });

                    it('contextOfParse.textBuffer is correct', function () {
                        expect(contextOfParse.textBuffer).toBe('a');
                    });

                    it('contextOfParse.attributes is object', function () {
                        expect(contextOfParse.attributes).toEqual(jasmine.any(Object));
                    });

                    it('attribute \'data\' defined', function () {
                        expect(contextOfParse.attributes['data']).toBeDefined();
                    });
                    it('attribute \'data\' has correct value', function () {
                        expect(contextOfParse.attributes['data']).toBe('a');
                    });

                    it('attribute \'id\' defined', function () {
                        expect(contextOfParse.attributes['id']).toBeDefined();
                    });
                    it('attribute \'id\' has correct value', function () {
                        expect(contextOfParse.attributes['id']).toBe('b');
                    });

                });

                describe('processingTagClose', function () {
                    var processingTagClose = processings.processingTagClose,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart,
                        processingTagName = processings.processingTagName;

                    it('was export', function () {
                        expect(processingTagClose).toBeDefined();
                    });

                    describe('change state', function () {
                        describe('to TEXT when not \'>\' after \'/\' ', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 's');
                            processingTagName(contextOfParse, 't');
                            processingTagName(contextOfParse, '/');
                            processingTagClose(contextOfParse, ' ');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });
                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('a<st/ ');
                            });
                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('a<st/ ');
                            });

                        });

                        describe('to TEXT when \'>\' after \'/\' ', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, 'a');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 's');
                            processingTagName(contextOfParse, 't');
                            processingTagName(contextOfParse, '/');
                            processingTagClose(contextOfParse, '>');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });
                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('');
                            });
                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('');
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
                                it('is Tag', function () {
                                    expect(tag instanceof htmlToASTNodes.Tag).toBeTruthy();
                                });
                                it('correct textNode.text', function () {
                                    expect(tag.name).toBe('st');
                                });
                                it('not add to contextOfParse.treeStack', function () {
                                    var treeStack = contextOfParse.treeStack;
                                    expect(treeStack.length).toBe(1);
                                    expect(treeStack[0]).toBe(contextOfParse.result);
                                });
                            });

                        });
                    });

                });

                describe('processingClosedTagStart', function () {
                    var processingClosedTagStart = processings.processingClosedTagStart,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart;

                    it('was exported', function () {
                        expect(processingClosedTagStart).toBeDefined();
                    });

                    describe('change state', function () {
                        describe('to TEXT when incorrect symbol', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, '/');
                            processingClosedTagStart(contextOfParse, ' ');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('</ ');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('</ ');
                            });


                        });
                        describe('to CLOSED_TAG_NAME', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, '/');
                            processingClosedTagStart(contextOfParse, 'a');

                            it('contextOfParse.state is CLOSED_TAG_NAME', function () {
                                expect(contextOfParse.state).toBe(states.CLOSED_TAG_NAME);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('</a');
                            });

                            it('contextOfParse.tagName is correct', function () {
                                expect(contextOfParse.tagName).toBe('a');
                            });
                        });
                    });
                });

                describe('processingClosedTagName', function () {
                    var processingClosedTagName = processings.processingClosedTagName,
                        processingClosedTagStart = processings.processingClosedTagStart,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart,
                        processingTagName = processings.processingTagName;

                    it('was exported', function () {
                        expect(processingClosedTagName).toBeDefined();
                    });

                    describe('change state', function () {
                        describe('to TEXT when incorrect symbol', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, '/');
                            processingClosedTagStart(contextOfParse, 'a');
                            processingClosedTagName(contextOfParse, ';');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('</a;');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('</a;');
                            });


                        });
                        describe('to TEXT when \'>\' after name', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, '>');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, '/');
                            processingClosedTagStart(contextOfParse, 'd');
                            processingClosedTagName(contextOfParse, 'i');
                            processingClosedTagName(contextOfParse, 'v');
                            processingClosedTagName(contextOfParse, '>');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('');
                            });

                            it('contextOfParse.treeStack is correct', function () {
                                var treeStack = contextOfParse.treeStack;
                                expect(treeStack.length).toBe(1);
                            });

                        });

                        describe('to CLOSED_TAG_BODY', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, '/');
                            processingClosedTagStart(contextOfParse, 'd');
                            processingClosedTagName(contextOfParse, 'i');
                            processingClosedTagName(contextOfParse, 'v');
                            processingClosedTagName(contextOfParse, ' ');

                            it('contextOfParse.state is CLOSED_TAG_BODY', function () {
                                expect(contextOfParse.state).toBe(states.CLOSED_TAG_BODY);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('</div ');
                            });

                            it('contextOfParse.tagName is correct', function () {
                                expect(contextOfParse.tagName).toBe('div');
                            });
                        });

                    });
                });

                describe('processingClosedTagBody', function () {
                    var processingClosedTagBody = processings.processingClosedTagBody,
                        processingClosedTagName = processings.processingClosedTagName,
                        processingClosedTagStart = processings.processingClosedTagStart,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart,
                        processingTagName = processings.processingTagName;

                    it('was exported', function () {
                        expect(processingClosedTagBody).toBeDefined();
                    });

                    describe('change state', function () {
                        describe('to TEXT when incorrect symbol', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, '/');
                            processingClosedTagStart(contextOfParse, 'a');
                            processingClosedTagName(contextOfParse, ' ');
                            processingClosedTagBody(contextOfParse, 'a');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('</a a');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('</a a');
                            });


                        });
                        describe('to TEXT when \'>\' after name', function () {
                            var contextOfParse = new ContextOfParse();

                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, 'd');
                            processingTagName(contextOfParse, 'i');
                            processingTagName(contextOfParse, 'v');
                            processingTagName(contextOfParse, '>');
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, '/');
                            processingClosedTagStart(contextOfParse, 'd');
                            processingClosedTagName(contextOfParse, 'i');
                            processingClosedTagName(contextOfParse, 'v');
                            processingClosedTagName(contextOfParse, ' ');
                            processingClosedTagBody(contextOfParse, '>');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('');
                            });

                            it('contextOfParse.treeStack is correct', function () {
                                var treeStack = contextOfParse.treeStack;
                                expect(treeStack.length).toBe(1);
                            });

                        });


                    });
                });

                describe('processingDeclarationStart', function () {
                    var processingDeclarationStart = processings.processingDeclarationStart,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart;

                    it('is define', function () {
                        expect(processingDeclarationStart).toBeDefined();
                    });

                    describe('change state', function () {

                        describe('to TEXT', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, '!');
                            processingDeclarationStart(contextOfParse, ' ');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('<! ');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('<! ');
                            });

                        });

                        describe('to COMMENT_START', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, '!');
                            processingDeclarationStart(contextOfParse, '-');

                            it('contextOfParse.state is COMMENT_START', function () {
                                expect(contextOfParse.state).toBe(states.COMMENT_START);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('<!-');
                            });

                        });

                    });

                });

                describe('processingCommentStart', function () {
                    var processingCommentStart = processings.processingCommentStart,
                        processingDeclarationStart = processings.processingDeclarationStart,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart;

                    it('is define', function () {
                        expect(processingCommentStart).toBeDefined();
                    });

                    describe('change state', function () {

                        describe('to TEXT', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, '!');
                            processingDeclarationStart(contextOfParse, '-');
                            processingCommentStart(contextOfParse, ' ');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('<!- ');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('<!- ');
                            });

                        });

                        describe('to COMMENT_BODY', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, '!');
                            processingDeclarationStart(contextOfParse, '-');
                            processingCommentStart(contextOfParse, '-');

                            it('contextOfParse.state is COMMENT_BODY', function () {
                                expect(contextOfParse.state).toBe(states.COMMENT_BODY);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('<!--');
                            });

                            it('contextOfParse.commentBuffer is correct', function () {
                                expect(contextOfParse.commentBuffer).toBe('');
                            });

                        });

                    });

                });

                describe('processingCommentBody', function () {
                    var processingCommentBody = processings.processingCommentBody,
                        processingCommentStart = processings.processingCommentStart,
                        processingDeclarationStart = processings.processingDeclarationStart,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart;

                    it('is define', function () {
                        expect(processingCommentBody).toBeDefined();
                    });

                    describe('change state', function () {

                        describe('to COMMENT_END', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, '!');
                            processingDeclarationStart(contextOfParse, '-');
                            processingCommentStart(contextOfParse, '-');
                            processingCommentBody(contextOfParse, 'a');
                            processingCommentBody(contextOfParse, '-');

                            it('contextOfParse.state is COMMENT_END', function () {
                                expect(contextOfParse.state).toBe(states.COMMENT_END);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('<!--a-');
                            });

                            it('contextOfParse.commentBuffer is correct', function () {
                                expect(contextOfParse.commentBuffer).toBe('a');
                            });

                            it('contextOfParse.commentToken is correct', function () {
                                expect(contextOfParse.commentToken).toBe('-');
                            });

                        });


                    });

                });

                describe('processingCommentEnd', function () {
                    var processingCommentEnd = processings.processingCommentEnd,
                        processingCommentBody = processings.processingCommentBody,
                        processingCommentStart = processings.processingCommentStart,
                        processingDeclarationStart = processings.processingDeclarationStart,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart;

                    it('is define', function () {
                        expect(processingCommentEnd).toBeDefined();
                    });

                    describe('change state', function () {

                        describe('to COMMENT_BODY', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, '!');
                            processingDeclarationStart(contextOfParse, '-');
                            processingCommentStart(contextOfParse, '-');
                            processingCommentBody(contextOfParse, 'a');
                            processingCommentBody(contextOfParse, '-');
                            processingCommentEnd(contextOfParse, ' ');

                            it('contextOfParse.state is COMMENT_BODY', function () {
                                expect(contextOfParse.state).toBe(states.COMMENT_BODY);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('<!--a- ');
                            });

                            it('contextOfParse.commentBuffer is correct', function () {
                                expect(contextOfParse.commentBuffer).toBe('a- ');
                            });


                        });

                        describe('to COMMENT_CLOSE', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, '!');
                            processingDeclarationStart(contextOfParse, '-');
                            processingCommentStart(contextOfParse, '-');
                            processingCommentBody(contextOfParse, 'a');
                            processingCommentBody(contextOfParse, '-');
                            processingCommentEnd(contextOfParse, '-');

                            it('contextOfParse.state is COMMENT_CLOSE', function () {
                                expect(contextOfParse.state).toBe(states.COMMENT_CLOSE);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('<!--a--');
                            });

                            it('contextOfParse.commentBuffer is correct', function () {
                                expect(contextOfParse.commentBuffer).toBe('a');
                            });

                        });


                    });

                });

                describe('processingCommentClose', function () {
                    var processingCommentClose = processings.processingCommentClose,
                        processingCommentEnd = processings.processingCommentEnd,
                        processingCommentBody = processings.processingCommentBody,
                        processingCommentStart = processings.processingCommentStart,
                        processingDeclarationStart = processings.processingDeclarationStart,
                        processingText = processings.processingText,
                        processingTagStart = processings.processingTagStart;

                    it('is define', function () {
                        expect(processingCommentEnd).toBeDefined();
                    });

                    describe('change state', function () {

                        describe('to COMMENT_BODY', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, '!');
                            processingDeclarationStart(contextOfParse, '-');
                            processingCommentStart(contextOfParse, '-');
                            processingCommentBody(contextOfParse, 'a');
                            processingCommentBody(contextOfParse, '-');
                            processingCommentEnd(contextOfParse, '-');
                            processingCommentClose(contextOfParse, 'b');

                            it('contextOfParse.state is COMMENT_BODY', function () {
                                expect(contextOfParse.state).toBe(states.COMMENT_BODY);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('<!--a--b');
                            });

                            it('contextOfParse.commentBuffer is correct', function () {
                                expect(contextOfParse.commentBuffer).toBe('a--b');
                            });


                        });

                        describe('to TEXT', function () {
                            var contextOfParse = new ContextOfParse();
                            processingText(contextOfParse, '<');
                            processingTagStart(contextOfParse, '!');
                            processingDeclarationStart(contextOfParse, '-');
                            processingCommentStart(contextOfParse, '-');
                            processingCommentBody(contextOfParse, 'a');
                            processingCommentBody(contextOfParse, '-');
                            processingCommentEnd(contextOfParse, '-');
                            processingCommentClose(contextOfParse, '>');

                            it('contextOfParse.state is TEXT', function () {
                                expect(contextOfParse.state).toBe(states.TEXT);
                            });

                            it('contextOfParse.buffer is correct', function () {
                                expect(contextOfParse.buffer).toBe('');
                            });

                            it('contextOfParse.textBuffer is correct', function () {
                                expect(contextOfParse.textBuffer).toBe('');
                            });

                            describe('Comment', function () {
                                var comment = contextOfParse.result.childNodes[0];

                                it('is define', function () {
                                    expect(comment).toBeDefined();
                                });

                                it('is comment', function () {
                                    expect(comment instanceof htmlToASTNodes.Comment).toBeTruthy();
                                });

                                it('comment.text is correct', function () {
                                    expect(comment.text).toBe('a');
                                });
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

        function createDefaultSpan(contentItem) {
            var createTagArguments = ['span', null];
            DL.cycle(arguments, function (contentItem) {
                createTagArguments.push(contentItem);
            });
            return DTesting.utils.createTag.apply(DTesting.utils, createTagArguments);
        }
        function defaultSpanTests(span) {
            it('span is parsed', function () {
                expect(span).toBeDefined();
            });

            it('span is parsed as Tag', function () {
                expect(span instanceof htmlToASTNodes.Tag).toBeTruthy();
            });

            it('correct name', function () {
                expect(span.name).toBe('span');
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

        describe('parse testing helpers', function () {
            it('createDefaultDiv', function () {
                expect(createDefaultDiv()).toEqual('<div class="block" data-foo="bar"></div>');
            });
        });

        describe('one span', function () {

            var ast = htmlToAST.parse(createDefaultSpan()),
                span = ast.childNodes[0];

            defaultSpanTests(span);

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

        });

        describe('<select> with not closed <option>', function () {
            var ast = htmlToAST.parse('<select><option value="1">hello<option value="2"><option value="3"></select>');
            var select = ast.childNodes[0];
            describe('select', function () {
                it('is define', function () {
                expect(select).toBeDefined();
                });
                it('has correct tag name', function () {
                    expect(select.name).toBe('select');
                });
                it('select.childNodes.length is 3', function () {
                    expect(select.childNodes.length).toBe(3);
                });
            });

            describe('option 1', function () {
                var option1 = select.childNodes[0];
                it('is define', function () {
                    expect(option1).toBeDefined()
                });
                it('has correct tag name', function () {
                    expect(option1.name).toBe('option');
                });
                it('has correct attribute', function () {
                    expect(option1.attributes.value).toBe('1');
                });
                it('has not child', function () {
                    expect(option1.childNodes.length).toBe(1);
                });
            });

            describe('option 2', function () {
                var option2 = select.childNodes[1];
                it('is define', function () {
                    expect(option2).toBeDefined()
                });
                it('has correct tag name', function () {
                    expect(option2.name).toBe('option');
                });
                it('has correct attribute', function () {
                    expect(option2.attributes.value).toBe('2');
                });
            });

            describe('option 3', function () {
                var option3 = select.childNodes[2];
                it('is define', function () {
                    expect(option3).toBeDefined()
                });
                it('has correct tag name', function () {
                    expect(option3.name).toBe('option');
                });
                it('has correct attribute', function () {
                    expect(option3.attributes.value).toBe('3');
                });

            });



        });

    });

});