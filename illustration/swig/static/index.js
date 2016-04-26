var jsonHash = require('./json_file');
var staticTag = require("./tag-static");

exports.init = function (swig) {
    swig.setExtension('static', function (input) {
        var hashList = {},
            output = input;

        var isJs = (/(\.js)$/).test(input);
        var isCss = (/(\.(scss|css))$/).test(input);

        if (isJs) {
            hashList = jsonHash.jsHash();
        } else if (isCss) {
            hashList = jsonHash.cssHash();
            input = input.replace(/(\.scss)$/, '.css'); //
        } else {
            hashList = jsonHash.imgHash();
        }

        if (hashList[input]) {
            output = '/' + STATIC_URL + hashList[input];
        } else if (NODE_ENV === 'dev' && isCss || isJs) {
            output = '/' + STATIC_URL + input;
        } else {
            output = '/' + STATIC_URL + input;
        }

        return output;
    });

    swig.setTag('static', staticTag.parse, staticTag.compile, staticTag.ends, staticTag.blockLevel);
};
