describe('Gulp tasks tests', function () {
    it('replace testing exports regexp', function () {
        var string = "gulp.task('templates', function(){\ngulp.src(['file.txt'])\n\t\t.pipe(replace(/foo(.{3})/g, '$1foo'))\n\t\t.pipe(gulp.dest('build/file.txt'));\n});\nAPI\n\n\n/*@testingExports*/\n\n\tasd\n\n\n/*@/testingExports*/\n\ngulp-replace can be called with a string or regex.\n\n\n        replace(string, replacement[, options])\n\n\nstring",
            neededResult = "gulp.task('templates', function(){\ngulp.src(['file.txt'])\n\t\t.pipe(replace(/foo(.{3})/g, '$1foo'))\n\t\t.pipe(gulp.dest('build/file.txt'));\n});\nAPI\n\n\n\n\ngulp-replace can be called with a string or regex.\n\n\n        replace(string, replacement[, options])\n\n\nstring",
            regexp = /\/\*@testingExports\*\/(.|\n|\t)*\/\*@\/testingExports\*\//g;

        expect(string.replace(regexp, '')).toBe(neededResult);

    })
});