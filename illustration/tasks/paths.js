/**
 * gulp.src 地址
 * gulp.dest 地址
 */

var commonSrc = './' + STATIC_DIR + '/**/*';
var widgetSrc = '!./' + STATIC_DIR + '/widget/**/*.*';
var bowerSrc = '!./' + STATIC_DIR + '/bower_components/**/*.*';
var fileOutput = '!./' + STATIC_DIR + '/' + STATIC_FILES_OUTPUT + '/**/*.*';
var commonDest = './' + STATIC_DIR + '/' + STATIC_FILES_OUTPUT;


module.exports = {
    js: {
        src: [
            commonSrc + '.js',
            widgetSrc,
            bowerSrc,
            fileOutput
        ],
        dest: commonDest
    },
    node: {
        src: ['./config/**/*.js', './controllers/**/*.js', './models/**/*.js', './swig/**/*.js']
    },
    img: {
        src: [
            commonSrc + '.png',
            commonSrc + '.jpg',
            commonSrc + '.jpeg',
            commonSrc + '.gif',
            commonSrc + '.bmp',
            widgetSrc,
            bowerSrc,
            fileOutput
        ],
        dest: commonDest
    },
    css: {
        src: [
            commonSrc + '.css',
            commonSrc + '.scss',
            widgetSrc,
            bowerSrc,
            fileOutput
        ],
        dest: commonDest
    },
    cleanSrc: [
        './hash',
        './' + STATIC_DIR + '/bower_components',
        commonDest
    ]
};
