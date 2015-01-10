describe('simpleDOM.nodes', function () {
    var simpleDOM = DTesting.global.simpleDOM,
        simpleDOMNodes = simpleDOM.nodes;

    describe('Fragment', function () {

        it('is define', function () {
            expect(simpleDOMNodes.Fragment).toBeDefined();
        });

        it('is constructor', function () {
            var fragment = new simpleDOMNodes.Fragment();
            expect(fragment).toEqual(jasmine.any(Object));
        });

        var fragment = new simpleDOMNodes.Fragment();

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
            expect(simpleDOMNodes.Tag).toBeDefined();
        });

        it('is constructor', function () {
            var tag = new simpleDOMNodes.Tag('div', {'class': 'block'});
            expect(tag).toEqual(jasmine.any(Object));
        });

        var tag = new simpleDOMNodes.Tag('div', {'class': 'block'});

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
            expect(simpleDOMNodes.Text).toBeDefined();
        });

        it('is constructor', function () {
            var text = new simpleDOMNodes.Text('text content');
            expect(text).toEqual(jasmine.any(Object));
        });

        var text = new simpleDOMNodes.Text('text content');

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
            expect(simpleDOMNodes.Comment).toBeDefined();
        });

        it('is constructor', function () {
            var comment = new simpleDOMNodes.Comment('comment text');
            expect(comment).toEqual(jasmine.any(Object));
        });

        var comment = new simpleDOMNodes.Comment('comment text');

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