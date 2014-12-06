describe('DOM research', function () {
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
});