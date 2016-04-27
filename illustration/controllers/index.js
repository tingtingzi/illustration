var express = require('express');
var router = express.Router();

module.exports = function (app) {
    app.use('/', router);
};


router.get('/auth/login', function (req, res) {
    res.render('auth/login');
});
router.get('/auth/changephone', function (req, res) {
    res.render('auth/changephone');
});
router.get('/auth/findpwd', function (req, res) {
    res.render('auth/findpwd');
});
router.get('/auth/resetpwd', function (req, res) {
    res.render('auth/resetpwd');
});


router.get('/activity/course', function (req, res) {
    res.render('activity/course');
});
router.get('/activity/detail', function (req, res) {
    res.render('activity/detail');
});


router.get('/news/comment', function (req, res) {
    res.render('news/comment');
});
router.get('/news/detail', function (req, res) {
    res.render('news/detail');
});
router.get('/news/index', function (req, res) {
    res.render('news/index');
});


router.get('/personal/apply', function (req, res) {
    res.render('personal/apply');
});
router.get('/personal/collect', function (req, res) {
    res.render('personal/collect');
});
router.get('/personal/comment', function (req, res) {
    res.render('personal/comment');
});
router.get('/personal/index', function (req, res) {
    res.render('personal/index');
});
router.get('/personal/join', function (req, res) {
    res.render('personal/join');
});
router.get('/personal/like', function (req, res) {
    res.render('personal/like');
});
router.get('/personal/user', function (req, res) {
    res.render('personal/user');
});







