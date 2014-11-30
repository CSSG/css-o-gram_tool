describe('HTML to AST', function () {

    describe('correct is define', function () {
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


                it('Node is define', function () {
                    expect(htmlToASTNodes.Node).toBeDefined();
                });

                it('Node is constructor', function () {
                    expect(htmlToASTNodes.Node).toEqual(jasmine.any(Function));
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


    var defaultSpan = '<span></span>';
    function defaultSpanTests(span) {
        it ('div is parsed', function () {
            expect(span).toBeDefined();
        });

        it('div is parsed as Tag', function () {
            expect(span instanceof htmlToASTNodes.Tag).toBe(true);
        });

        it('correct name', function () {
            expect(span.name).toBe('div');
        });

        it('attributes is empty', function () {
            expect(DL.getObjectLength(span.attributes)).toBe(0);
        });
    }

    var defaultDiv = '<div class="block" data-foo="bar"></div>';
    function defaultDivTests (div) {
        it ('div is parsed', function () {
            expect(div).toBeDefined();
        });

        it('div is parsed as Tag', function () {
            expect(div instanceof htmlToASTNodes.Tag).toBe(true);
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

        it('any AST root is Fragment', function () {
            var ast = htmlToAST.parse('');
            expect(ast instanceof htmlToASTNodes.Fragment).toBe(true);
        });

        describe('one div', function () {

            var ast = htmlToAST.parse(defaultDiv),
                div = ast.childNodes[0];

            defaultDivTests(div);

        });


        describe('2 linear tags', function () {

            var ast = htmlToAST.parse(defaultSpan + defaultDiv),
                span = ast.childNodes[0],
                div = ast.childNodes[1];

            describe('span', function () {
                defaultSpanTests(span);
            });

            describe('div', function () {
                defaultDivTests(div);
            });



        });

    });



});