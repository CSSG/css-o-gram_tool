describe('simpleDOM.helpers', function () {
    var simpleDOM = DTesting.global.simpleDOM,
        simpleDOMNodes = simpleDOM.nodes,
        simpleDOMHelpers = simpleDOM.helpers;

    describe('appendChild()', function () {
        it('is defined', function () {
            expect(simpleDOMHelpers.appendChild).toBeDefined();
        });

        it('is function', function () {
            expect(simpleDOMHelpers.appendChild).toEqual(jasmine.any(Function));
        });

        describe('appendChild() div into fragment', function () {
            var fragment = new simpleDOMNodes.Fragment(),
                div = new simpleDOMNodes.Tag('div', {'class': 'block'});

            simpleDOMHelpers.appendChild(fragment, div);
            it('correct div position', function () {
                expect(fragment.childNodes[0]).toBe(div);
            });
            it('div.parentNode is fragment', function () {
                expect(div.parentNode).toBe(fragment);
            });

        });

        describe('appendChild() reappend div', function () {
            var div = new simpleDOMNodes.Tag('div'),
                div2 = new simpleDOMNodes.Tag('div'),
                fragment = new simpleDOMNodes.Fragment();

            simpleDOMHelpers.appendChild(div2, div);
            simpleDOMHelpers.appendChild(fragment, div);

            it('div correct parent node', function () {
                expect(div.parentNode).toBe(fragment);
            });

            it('div2.childNodes is correct', function () {
                expect(div2.childNodes.length).toBe(0);
            });

        });

        describe('appendChild() for fragment', function () {
            var div = new simpleDOMNodes.Tag('div'),
                div2 = new simpleDOMNodes.Tag('div'),
                div3 = new simpleDOMNodes.Tag('div'),
                fragment = new simpleDOMNodes.Fragment();

            simpleDOMHelpers.appendChild(fragment, div2);
            simpleDOMHelpers.appendChild(fragment, div3);
            simpleDOMHelpers.appendChild(div, fragment);

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
            expect(simpleDOMHelpers.removeChild).toBeDefined();
        });
        it('is function', function () {
            expect(simpleDOMHelpers.removeChild).toEqual(jasmine.any(Function));
        });

        describe('simple remove', function () {
            var div = new simpleDOMNodes.Tag('div'),
                div2 = new simpleDOMNodes.Tag('div');

            simpleDOMHelpers.appendChild(div, div2);
            simpleDOMHelpers.removeChild(div, div2);

            it('div.childNodes is empty', function () {
                expect(div.childNodes.length).toBe(0);
            });

            it('div2.parentNode is null', function () {
                expect(div2.parentNode).toBeNull();
            });
        });

        describe('remove second of three nodes', function () {
            var div = new simpleDOMNodes.Tag('div'),
                div1 = new simpleDOMNodes.Tag('div'),
                div2 = new simpleDOMNodes.Tag('div'),
                div3 = new simpleDOMNodes.Tag('div');

            simpleDOMHelpers.appendChild(div, div1);
            simpleDOMHelpers.appendChild(div, div2);
            simpleDOMHelpers.appendChild(div, div3);
            simpleDOMHelpers.removeChild(div, div2);

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