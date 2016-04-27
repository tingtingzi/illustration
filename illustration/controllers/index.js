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


router.get('/profile/apply', function (req, res) {
    res.render('profile/apply');
});
router.get('/profile/collect', function (req, res) {
    res.render('profile/collect');
});
router.get('/profile/comment', function (req, res) {
    res.render('profile/comment');
});
router.get('/profile/index', function (req, res) {
    res.render('profile/index');
});
router.get('/profile/join', function (req, res) {
    res.render('profile/join');
});
router.get('/profile/like', function (req, res) {
    res.render('profile/like');
});
router.get('/profile/user', function (req, res) {
    res.render('profile/user');
});







