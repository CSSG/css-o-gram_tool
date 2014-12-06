describe('DTesting.utils: createTag', function () {

    it('correct define', function () {
        expect(DTesting.utils.createTag).toBeDefined();
    });

    var createTag = DTesting.utils.createTag;


    it('create span', function () {
        var result = createTag('span');
        expect(result).toBe('<span></span>');
    });

    it('create span with attributes', function () {
        var result = createTag('span', {'class': 'block', 'data-foo': 'bar'});
        expect(result).toBe('<span class="block" data-foo="bar"></span>');
    });

    it('create div with attributes and content', function () {
        var result = createTag(
                'div',
                {
                    'class': 'block',
                    'data-foo': 'bar'
                },
                '<div></div>'
            );
        expect(result).toBe('<div class="block" data-foo="bar"><div></div></div>');
    });

    it('create div without attributes but has content', function () {
        var result = createTag(
                'div',
                null,
                '<div></div>'
            );
        expect(result).toBe('<div><div></div></div>');
    });

    it('create div with attributes and 2 div + 1 span', function () {
        var result = createTag(
                'div',
                {
                    'class': 'block',
                    'data-foo': 'bar'
                },
                createTag(
                    'div',
                    {
                        'class': 'block_inner'
                    }
                ),
                createTag(
                    'div',
                    null,
                    createTag('div')
                ),
                createTag('span')
            );
        expect(result).toBe('<div class="block" data-foo="bar"><div class="block_inner"></div><div><div></div></div><span></span></div>');
    });

    describe('without content tags list', function () {
        DL.cycle(['input', 'img', 'br', 'hr', 'link', 'meta'], function (tagName) {
            it('<' + tagName + ' />', function () {
                var result = createTag(tagName, {'class': 'tag'}, '<div></div>');
                expect(result).toBe('<' + tagName + ' class="tag" />');
            });
        });
    });

});