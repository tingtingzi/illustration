var express = require('express');
var router = express.Router();
module.exports = function (app) {
    app.use('/', router);
};

/**
 * 首页
 */
router.get('/', function (req, res) {
    res.render('index');
});







