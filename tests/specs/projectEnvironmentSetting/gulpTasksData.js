describe('Gulp tasks data', function () {

    it('replace DTesting exports regexp', function () {
        var string = "gulp.task('templates', function(){\ngulp.src(['file.txt'])\n\t\t.pipe(replace(/foo(.{3})/g, '$1foo'))\n\t\t.pipe(gulp.dest('build/file.txt'));\n});\nAPI\n\n\n/*@DTesting.exports*/\n\n\tasd\n   asd.Wu()\n   var asd = 10 + 20 * 80 / 10\n\n\n/*@/DTesting.exports*/\n\ngulp-replace can be called with a string or regex.\n\n\n        replace(string, replacement[, options])\n\n\nstring",
            neededResult = "gulp.task('templates', function(){\ngulp.src(['file.txt'])\n\t\t.pipe(replace(/foo(.{3})/g, '$1foo'))\n\t\t.pipe(gulp.dest('build/file.txt'));\n});\nAPI\n\n\n\n\ngulp-replace can be called with a string or regex.\n\n\n        replace(string, replacement[, options])\n\n\nstring",
            regexp = /\/\*@DTesting.exports\*\/(.|\n|\t)*\/\*@\/DTesting.exports\*\//g;

        expect(string.replace(regexp, '')).toBe(neededResult);

    })
});