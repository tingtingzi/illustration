try {
    require('dotenv').load({silent: true});
} catch (error) {
    console.log('没有.env文件，将会从 process.env 中读取');
}

var extend = require('util')._extend;
var config = {};
var env = process.env.NODE_ENV;

if (!(/^(dev)|(prod)|(test)|(staging)$/).test(env)) {
    console.log('请先设置当前项目的运行环境 ' +
        '\n dev(开发) 或者 prod(生产) 或者 test(跑单元测试) 或者 staging(测试环境/仿真环境)' +
        '\n 设置方式可为设置环境变量 NODE_ENV=环境名称，或者在项目根目录下新建一个 .env 文件 在里面写上一行代码 NODE_ENV=环境名称' +
        '\n 格式（环境变量名称=值【没有引号】），比如 NODE_ENV=dev ');
    process.exit(1);
}

switch (env) {
    case 'dev':
        config = extend(require('./env/dev'), require('./env/base'));
        break;
    case 'test':
        config = extend(require('./env/test'), require('./env/base'));
        break;
    case 'prod':
        config = extend(require('./env/prod'), require('./env/base'));
        break;
    case 'staging':
        config = extend(require('./env/staging'), require('./env/base'));
        break;
}

var reWrittenEnv = function (config) {
    var envList = [];
    for (var o in config) {
        envList[envList.length] =  o + '=' + config[o] + '\n';
    }
};

if (env !== 'test') {
    reWrittenEnv(config);
}

for (var o in config) {
    global[o] = config[o];
    process.env[o] = config[o];
}

exports.staus = true;
