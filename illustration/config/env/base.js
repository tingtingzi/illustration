var env = require('../../tool');

module.exports = {
    PORT: env.port('PORT', 3000),
    NODE_ENV: env.name('NODE_ENV'),
    STATIC_DIR: env.string('STATIC_DIR', 'public'),
    STATIC_URL: env.staticUrl('STATIC_URL', 'static'),
    STATIC_FILES_OUTPUT: env.string('STATIC_FILES_OUTPUT', 'assets'),
    SITE_TITLE: env.string('SITE_TITLE', 'project_name')
};
