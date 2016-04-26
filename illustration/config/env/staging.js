var env = require('../../tool');

module.exports = {
    BASE_URL: env.httpUrl('BASE_URL'),
    BASE_CLIENT_ID: env.string('BASE_CLIENT_ID'),
    BASE_CLIENT_SECRET: env.string('BASE_CLIENT_SECRET'),
    SITE_TITLE: env.string('SITE_TITLE'),
    SENTRY_API: env.sentry('SENTRY_API')
};
