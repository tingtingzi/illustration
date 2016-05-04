$(function () {
    /**
     * 切换
     */
    $('body').on('click', '.tab-link a', function () {
        var index = $(this).index();
        $(this).addClass('active').siblings('a').removeClass('active');
        $('.tab-content .tab-content-box').eq(index).addClass('active').siblings('.tab-content-box').removeClass('active');
    })

    /**
     * 发送验证码
     */
    $('#js-send-verify_code').on('click', function () {
        var self = $(this);
        var phone = self.data('phone');

        if (self.hasClass('disabled')) {
            return false;
        }
        self.addClass('disabled');
        $.ajax({
            url: '/api/mobile_code/',
            type: 'POST',
            dataType: 'json',
            data: {mobile: phone},
            success: function (resp) {
                if (resp.code == 10000) {
                    $('#id_verify_code').removeAttr('disabled');
                    countDown(self);
                } else {
                    self.removeClass('disabled');
                    alert(resp.msg);
                }
            },
            error: function () {
                self.removeClass('disabled');
                alert('请求失败，请稍后再试');
            }
        });
    });

    /**
     * 倒计时
     */
    function countDown(btn) {
        var seconds = 10;
        var countDownInterval = 0;
        countDownInterval = setInterval(function () {
            btn.html('重新发送 ' + seconds);
            seconds--;
            if (seconds === -1) {
                clearInterval(countDownInterval);
                countDownInterval = 0;
                btn.html('重新发送').removeClass('disabled');
            }
        }, 1000);
    }
})
