$(function() {
    'use strict';
    var templates = Handlebars.templates || {};
    templates.alertTip = Handlebars.compile($('#alert-tip-template').html());
    var pop = null;

    /* 发表评论 */
    $('body').on('click', '#offCanvasWrapper', function (e) {
        e.preventDefault();
        var _self = $(this);
        var param = {
            url: _self.data('url')
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

    /* 发表评论提交 */
    $('body').on('click', '.sure', function () {
        var self = $(this);
        var url = self.data("url");
        var val = $('.content-val').val();

        if (self.hasClass('posting')) {
            return false;
        }
        self.addClass('posting');
        $.post(url, {'val': val}, function (resp) {
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
        val = 400 - val.length;
        $('.rest-num').html('剩余' + val + '个字')
    })
})
