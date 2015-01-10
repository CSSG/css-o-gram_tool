describe('simpleDOM.parse', function () {
    var defaultLib = DTesting.global.DL;
    var simpleDOM = DTesting.global.simpleDOM,
        simpleDOMNodes = simpleDOM.nodes;

    it('any AST root is Fragment', function () {
        var ast = simpleDOM.parse('');
        expect(ast instanceof simpleDOMNodes.Fragment).toBeTruthy();
    });

    //
    // tests helpers
    //

    function createDefaultSpan(contentItem) {
        var createTagArguments = ['span', null];
        defaultLib.cycle(arguments, function (contentItem) {
            createTagArguments.push(contentItem);
        });
        return DTesting.utils.createTag.apply(DTesting.utils, createTagArguments);
    }

    function defaultSpanTests(span) {
        it('span is parsed', function () {
            expect(span).toBeDefined();
        });

        it('span is parsed as Tag', function () {
            expect(span instanceof simpleDOMNodes.Tag).toBeTruthy();
        });

        it('correct name', function () {
            expect(span.name).toBe('span');
        });

        it('attributes is empty', function () {
            expect(defaultLib.getObjectLength(span.attributes)).toBe(0);
        });
    }

    function createDefaultDiv(contentItem) {
        var createTagArguments = ['div', {'class': 'block', 'data-foo': 'bar'}];
        defaultLib.cycle(arguments, function (contentItem) {
            createTagArguments.push(contentItem);
        });
        return DTesting.utils.createTag.apply(DTesting.utils, createTagArguments);
    }

    function defaultDivTests (div) {
        it ('div is parsed', function () {
            expect(div).toBeDefined();
        });

        it('div is parsed as Tag', function () {
            expect(div instanceof simpleDOMNodes.Tag).toBeTruthy();
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

    //
    // /tests helpers
    //

    describe('parse testing helpers', function () {
        it('createDefaultDiv', function () {
            expect(createDefaultDiv()).toEqual('<div class="block" data-foo="bar"></div>');
        });
    });

    describe('one span', function () {

        var ast = simpleDOM.parse(createDefaultSpan()),
            span = ast.childNodes[0];

        defaultSpanTests(span);

    });

    describe('one div with attributes', function () {

        var ast = simpleDOM.parse(createDefaultDiv()),
            div = ast.childNodes[0];

        defaultDivTests(div);

    });


    describe('2 linear tags', function () {

        var ast = simpleDOM.parse(createDefaultSpan() + createDefaultDiv()),
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
        var ast = simpleDOM.parse(createDefaultDiv(createDefaultDiv())),
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
        var ast = simpleDOM.parse('<select><option value="1">hello<option value="2"><option value="3"></select>');
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