$(function() {
    'use strict';
    var templates = Handlebars.templates || {};
    templates.alertTip = Handlebars.compile($('#alert-tip-template').html());
    templates.verifyCode = Handlebars.compile($('#verify-code-template').html());
    var pop = null;

    /* 修改昵称、修改个性签名弹框 */
    $('body').on('click', '.user-update-btn', function (e) {
        e.preventDefault();
        var _self = $(this);
        var param = {
            type: _self.data('type'),
            title: _self.data('title'),
            url: _self.data('url'),
            val: _self.data('val'),
            num: (200 - _self.data('val').length)
        };
        alertTip(param);
    });
    function alertTip(param) {
        $("#pop").remove();
        $(templates.alertTip(param)).appendTo('body').bPopup({
            closeClass: 'cancel',
            follow: [false, false],
            position: [0, $(window).scrollTop()+$(window).height()-$('.pop').height()],
            onOpen: function () {
                if (pop) {
                    pop.remove();
                }
                pop = this;
            },
            onClose: function () {
                this.remove();
            }
        })
    }

    /* 修改昵称、修改个性签名提交 */
    $('body').on('click', '.sure', function () {
        var self = $(this);
        var url = self.data("url");
        var type = self.data("type");
        var val = $('.content-val').val();

        if (self.hasClass('posting')) {
            return false;
        }
        self.addClass('posting');
        $.post(url, {'val': val}, function (resp) {
            if (resp.state) {
                if (type == 'name') {
                    $('.name-value').html(val);
                }else if (type == 'sign') {
                    $('.sign-value').html(val);
                }
            } else {
                self.removeClass('posting');
                alert('提交失败!');
            }
        });
    });

    /* 修改密码时发送验证码弹框 */
    $('body').on('click', '.send-verify-code', function (e) {
        e.preventDefault();
        var _self = $(this);
        var param = {
            phone: _self.data('phone'),
            url: _self.data('url')
        };

        $("#pop").remove();
        $(templates.verifyCode(param)).appendTo('body').bPopup({
            closeClass: 'cancel',
            follow: [false, false],
            onOpen: function () {
                if (pop) {
                    pop.remove();
                }
                pop = this;
            },
            onClose: function () {
                this.remove();
            }
        })
    });

    /* 发送验证提交 */
    $('body').on('click', '.verify-code-btn', function () {
        var self = $(this);
        var url = self.data("url");
        var phone = self.data("phone");

        if (self.hasClass('posting')) {
            return false;
        }
        self.addClass('posting');
        $.post(url, {'phone': phone}, function (resp) {
            if (resp.state) {
                window.location.href = resp.redirect_url;
            } else {
                self.removeClass('posting');
                alert('提交失败!');
            }
        });
    });

    /* 实时监控剩余字数 */
    $('body').on('keyup blur change', '.content-val', function() {
        var self = $(this);
        var val = $.trim(self.val());
        val = 200 - val.length;
        $('.rest-num').html('剩余' + val + '个字')
    })
})
