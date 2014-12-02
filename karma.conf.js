// Karma configuration
// Generated on Sat Nov 29 2014 17:21:38 GMT+0300 (MSK)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'src/js/defaultLib/DL.js',
        'src/js/defaultLib/utils/**/*.js',
        'src/js/defaultLib/modules/**/*.js',
        'tests/testsUtils/TESTS_UTILS.js',
        'tests/testsUtils/**/*.js',


        'tests/specs/testsWork.js',
        'tests/specs/currentSpec/DL.js',
        'tests/specs/testsUtils/testsUtilsMain.js',
        'tests/specs/testsUtils/createTag.js',
        'tests/specs/helpersTests/DOMResearch.js',
        'tests/specs/currentSpec/htmlToAST.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
