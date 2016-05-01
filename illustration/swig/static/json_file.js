var jsonfile = require('jsonfile');
var csshashFile, jsHashFile, imgHashFile;
var cssCompressed, jsCompressed, imgCompressed;
var isDev =  'dev';

try {
    csshashFile = jsonfile.readFileSync('./hash/css_hash.json');
    cssCompressed = true;
} catch (e) {
    csshashFile = {};
}

try {
    jsHashFile = jsonfile.readFileSync('./hash/js_hash.json');
    jsCompressed = true;
} catch (e) {
    jsHashFile = {};
}

try {
    imgHashFile = jsonfile.readFileSync('./hash/img_hash.json');
    imgCompressed = true;
} catch (e) {
    imgHashFile = {};
}

exports.cssHash = function () {
    var file = isDev ? (cssCompressed ? jsonfile.readFileSync('./hash/css_hash.json') : csshashFile) : csshashFile;
    var json = {};

    for (var key in file) {
        var l = key,
            r = file[key];

        json['/' + l] = '/' + STATIC_FILES_OUTPUT + '/' + r;
    }

    return json;
};

exports.jsHash = function () {
    var file = isDev ? (jsCompressed ? jsonfile.readFileSync('./hash/js_hash.json') : jsHashFile) : jsHashFile;
    var json = {};

    for (var key in file) {
        var l = key,
            r = file[key];

        json['/' + l] = '/' + STATIC_FILES_OUTPUT + '/' + r;
    }

    return json;
};

exports.imgHash = function () {
    var file = isDev ? (imgCompressed ? jsonfile.readFileSync('./hash/img_hash.json') : imgHashFile) : imgHashFile;
    var json = {};

    for (var key in file) {
        var l = key,
            r = file[key];

        json['/' + l] = '/' + STATIC_FILES_OUTPUT + '/' + r;
    }

    return json;
};
