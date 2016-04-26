var env = require('../../tool');

module.exports = {
    BASE_URL: env.httpUrl('BASE_URL', 'http://api.mmtk.com'),
    BASE_CLIENT_ID:env.string('BASE_CLIENT_ID', 'acttaoapp'),
    BASE_CLIENT_SECRET:env.string('BASE_CLIENT_SECRET', 'acttaoapp'),
    BASE_REDIRECT_URI: env.httpUrl('BASE_REDIRECT_URI', 'http://www.acttao.com'),
    BASE_RESPONSE_TYPE: env.string('BASE_RESPONSE_CODE', 'code')
};

