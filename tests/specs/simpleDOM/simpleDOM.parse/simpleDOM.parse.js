describe('simpleDOM.parse', function () {
    var defaultLib = DTesting.global.DL;
    var simpleDOM = DTesting.global.simpleDOM,
        simpleDOMNodes = simpleDOM.nodes;

    it('any simpleDOMResult root is Fragment', function () {
        var simpleDOMResult = simpleDOM.parse('');
        expect(simpleDOMResult instanceof simpleDOMNodes.Fragment).toBeTruthy();
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

        var simpleDOMResult = simpleDOM.parse(createDefaultSpan()),
            span = simpleDOMResult.childNodes[0];

        defaultSpanTests(span);

    });

    describe('one div with attributes', function () {

        var simpleDOMResult = simpleDOM.parse(createDefaultDiv()),
            div = simpleDOMResult.childNodes[0];

        defaultDivTests(div);

    });


    describe('2 linear tags', function () {

        var simpleDOMResult = simpleDOM.parse(createDefaultSpan() + createDefaultDiv()),
            span = simpleDOMResult.childNodes[0],
            div = simpleDOMResult.childNodes[1];

        describe('span', function () {
            defaultSpanTests(span);
        });

        describe('div', function () {
            defaultDivTests(div);
        });

    });

    describe('2 nested divs', function () {
        var simpleDOMResult = simpleDOM.parse(createDefaultDiv(createDefaultDiv())),
            div1 = simpleDOMResult.childNodes[0],
            div2 = simpleDOMResult.childNodes[0].childNodes[0];

        describe('parent div', function () {
            defaultDivTests(div1);
        });

        describe('children div', function () {
            defaultDivTests(div2);
        });

    });

    describe('<select> with not closed <option>', function () {
        var simpleDOMResult = simpleDOM.parse('<select><option value="1">hello<option value="2"><option value="3"></select>');
        var select = simpleDOMResult.childNodes[0];
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

    describe('comment parse', function () {
        var simpleDOMResult = simpleDOM.parse('a<div></div><!--CoMmEnT-->b');

        var resultFragmentChildNodes = simpleDOMResult.childNodes;

        it('correct result.childNodes length', function () {
            expect(resultFragmentChildNodes.length).toBe(4);
        });

        describe('first textNode', function () {
            var textNode = resultFragmentChildNodes[0];

            it('is define', function () {
                expect(textNode).toBeDefined();
            });

            it('is Text', function () {
                expect(textNode instanceof simpleDOMNodes.Text).toBe(true);
            });

            it('textNode.text is correct', function () {
                expect(textNode.text).toBe('a');
            });

        });

        describe('tag', function () {
            var tag = resultFragmentChildNodes[1];

            it('is define', function () {
                expect(tag).toBeDefined();
            });

            it('is Tag', function () {
                expect(tag instanceof simpleDOMNodes.Tag).toBe(true);
            });

            it('tag.name is correct', function () {
                expect(tag.name).toBe('div');
            });

        });

        describe('comment', function () {
            var comment = resultFragmentChildNodes[2];

            it('is define', function () {
                expect(comment).toBeDefined();
            });

            it('is Tag', function () {
                expect(comment instanceof simpleDOMNodes.Comment).toBe(true);
            });

            it('tag.name is correct', function () {
                expect(comment.text).toBe('CoMmEnT');
            });
        });

        describe('second textNode', function () {
            var textNode = resultFragmentChildNodes[3];

            it('is define', function () {
                expect(textNode).toBeDefined();
            });

            it('is Text', function () {
                expect(textNode instanceof simpleDOMNodes.Text).toBe(true);
            });

            it('textNode.text is correct', function () {
                expect(textNode.text).toBe('b');
            });

        });
    });

    describe('unfinished part', function () {
        var simpleDOMResult = simpleDOM.parse('a<div></div><da');

        var resultFragmentChildNodes = simpleDOMResult.childNodes;

        it('correct result.childNodes length', function () {
            expect(resultFragmentChildNodes.length).toBe(3);
        });

        describe('first textNode', function () {
            var textNode = resultFragmentChildNodes[0];

            it('is define', function () {
                expect(textNode).toBeDefined();
            });

            it('is Text', function () {
                expect(textNode instanceof simpleDOMNodes.Text).toBe(true);
            });

            it('textNode.text is correct', function () {
                expect(textNode.text).toBe('a');
            });

        });

        describe('tag', function () {
            var tag = resultFragmentChildNodes[1];

            it('is define', function () {
                expect(tag).toBeDefined();
            });

            it('is Tag', function () {
                expect(tag instanceof simpleDOMNodes.Tag).toBe(true);
            });

            it('tag.name is correct', function () {
                expect(tag.name).toBe('div');
            });

        });

        describe('second textNode', function () {
            var textNode = resultFragmentChildNodes[2];

            it('is define', function () {
                expect(textNode).toBeDefined();
            });

            it('is Text', function () {
                expect(textNode instanceof simpleDOMNodes.Text).toBe(true);
            });

            it('textNode.text is correct', function () {
                expect(textNode.text).toBe('<da');
            });

        });

    });

});