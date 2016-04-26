var express = require('express');
var glob = require('glob');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require("cookie-session");
var bodyParser = require('body-parser');
var raven = require('raven');
var crypto = require("crypto");

var swig = require('swig');
var staticTag = require('./swig/static');

var app = express();
var client;

app.locals.ENV = global.NODE_ENV;
app.locals.ENV_DEV = (global.NODE_ENV === 'dev');

app.set('trust proxy', 1);
app.use(session({
    name: 'token',
    secret: crypto.createHash("md5").update("meimor-mobile-project 2015-11"),
    keys: ['key1', 'key2'],
    maxAge: 8 * 60 * 60 * 1000
}));

// view engine setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('view cache', false);
app.set('views', path.join(__dirname, 'views'));
swig.setDefaults({cache: false});
swig.setDefaults({loader: swig.loaders.fs(__dirname + '/views')});
staticTag.init(swig);

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, STATIC_DIR)));


var controllers = glob.sync('./controllers/*.js');
controllers.forEach(function (controller) {
    require(controller)(app);
});



if (NODE_ENV !== 'dev' && NODE_ENV !== 'test' && SENTRY_API) {
    client = new raven.Client(SENTRY_API);
    app.use(raven.middleware.express(client));
    app.use(function (err, req, res, next) {
        if (res.sentry && app.get('env')) {
            throw new Error(err);
        }
        next(err);
    });
}

app.use(function (err, req, res, next) {
    res.locals = {env: NODE_ENV};
    // treat as 404
    if (err.message
        && (~err.message.indexOf('not found')
        || (~err.message.indexOf('Cast to ObjectId failed')))) {
        return next();
    }
    res.status(500).render('500', { error: err.stack });
});

app.use(function (req, res, next) {
    res.status(404).render('404', {
        url: req.originalUrl,
        error: 'Not found'
    });
});


module.exports = app;
