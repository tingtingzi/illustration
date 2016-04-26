var env = require('../../tool');

module.exports = {
    BASE_URL: env.httpUrl('BASE_URL', 'http://bapi.acttao.com'),
    BASE_CLIENT_ID: env.string('BASE_CLIENT_ID', 'acttaoapp'),
    BASE_CLIENT_SECRET: env.string('BASE_CLIENT_SECRET', 'acttaoapp')
};
