$(function () {
    $('body').on('click', '.tab-link a', function () {
        var index = $(this).index();
        $(this).addClass('active').siblings('a').removeClass('active');
        $('.tab-content .tab-content-box').eq(index).addClass('active').siblings('.tab-content-box').removeClass('active');
    })
})
