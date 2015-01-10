describe('isSingletonHTMLTag (DTesting.exports.simpleDOM.parse.microhelpers)', function () {
    var parseExports = DTesting.exports.simpleDOM.parse;
    var isSingletonHTMLTag = parseExports.microehelpers.isSingletonHTMLTag;

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