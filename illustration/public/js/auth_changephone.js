$(function() {
    /**
     * 发送验证码
     */
    $('#js-send-verify_code').on('click', function () {
        var btn = $(this);
        var phone = $('#id_mobile');

        if (!(/^(13[0-9]|15[0-9]|14[0-9]|17[0-9]|18[0-9])\d{8}$/).test($.trim(phone.val()))) {
            alert('请输入正确的手机号');
            return false;
        }

        if (btn.hasClass('disabled')) {
            return false;
        }
        btn.addClass('disabled');
        $.ajax({
            url: '/api/mobile_code/',
            type: 'POST',
            dataType: 'json',
            data: {mobile: $.trim(phone.val())},
            success: function (resp) {
                if (resp.code == 10000) {
                    $('#id_verify_code').removeAttr('disabled');
                    countDown(btn);
                } else {
                    btn.removeClass('disabled');
                    alert(resp.msg);
                }
            },
            error: function () {
                btn.removeClass('disabled');
                alert('请求失败，请稍后再试');
            }
        });
    });

    /**
     * 倒计时
     */
    var countDownInterval = 0;
    function countDown(btn) {
        var seconds = 180;
        countDownInterval = 0;
        countDownInterval = setInterval(function () {
            btn.html(seconds + ' 秒后重发');
            seconds--;
            if (seconds === 0) {
                clearInterval(countDownInterval);
                countDownInterval = 0;
                btn.html('发送短信验证码').removeClass('disabled');
            }
        }, 1000);
    }
})
