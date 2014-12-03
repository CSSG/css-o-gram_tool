var gulp = require('gulp');
var replace = require('gulp-replace');

gulp.task('default', function () {
    //basis for remove testing exports
    gulp.src(['tests/gulpTests/text.txt'])
        .pipe(replace(/\/\*@testingExports\*\/(.|\n|\t)*\/\*@\/testingExports\*\//g, ''))
        .pipe(gulp.dest('tests/gulpTests/text-clean'));
});