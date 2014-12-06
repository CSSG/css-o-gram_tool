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
        //Test works tests (it's some funny, but we need check testing framework)
        'tests/specs/testsWork.js',

        //tests for researches (researches need for check suppositions arising in process)
        'tests/specs/researches/DOM.js',
        'tests/specs/researches/jsTypeDetection.js',

        //define DTesting for exports
        'tests/tools/DTesting/DTesting.js',

        //project code: define and utils
        'src/js/defaultLib/DL.js',
        'src/js/defaultLib/utils/**/*.js',

        //DTesting utils
        'tests/tools/DTesting/utils/**/*.js',

        //project code: modules
        'src/js/defaultLib/modules/**/*.js',

        //project build utils tests
        'tests/specs/projectEnvironmentSetting/gulpTasksData.js',

        //DTesting tests
        'tests/specs/DTesting/DTesting.js',
        'tests/specs/DTesting/infrastructure/exportsForTests.js',
        'tests/specs/DTesting/utils/createTag.js',

        //Default Lib define tests
        'tests/specs/DL/DL.js',

        //Default Lib utils tests
        'tests/specs/DL/utils/typesDetectors.js',
        'tests/specs/DL/utils/cycle.js',
        'tests/specs/DL/utils/getObjectSafely.js',

        //Default Lib utils modules
        'tests/specs/DL/modules/htmlToAST.js'

        //project code tests
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
