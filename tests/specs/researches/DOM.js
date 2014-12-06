describe('research: DOM', function () {
    describe('textNode', function () {
        it('has parentNode property', function () {
            var div = document.createElement('div'),
                    textNode = document.createTextNode('');
            div.appendChild(textNode);
            expect(textNode.parentNode).toBe(div);
        });
        it('parentNode property is null by default', function () {
            var textNode = document.createTextNode('');
            expect(textNode.parentNode).toBe(null);
        });
    });

    describe('nodes collections', function () {
        var div = document.createElement('div'),
            div2 = document.createElement('div');
        div.appendChild(div2);

        it('getElementsByClassName instanceof HTMLCollection', function () {
            expect(div.getElementsByTagName('test') instanceof HTMLCollection).toBe(true);
        });

        it('childNodes instanceof nodesList', function () {
            expect(div.childNodes instanceof NodeList).toBe(true);
        });

    });
});