/* global mediaUrl */

/**
 * 上传之后的回调函数
 * @param data
 */
function uploadCallBack(data) {
    if (data.indexOf('{') === 0) {
        data = JSON.parse(data);
    } else {
        data = {"state":false,"data":{"image":["图片上传失败"]}}
    }

    if (data.state) {
        $('.user-img').attr('src', data.image_url);
    } else {
        alert(data.data.image);
    }
    $('#upload-label').attr('for', 'upload-image');
}

/**
 * 使用 iframe 方式上传文件
 */
function createIframe() {
    var oldIframe = document.getElementById('id_upload_iframe');
    if (oldIframe) {
        document.body.removeChild(oldIframe);
        oldIframe = null;
    }
    var iframe = document.createElement('iframe');
    iframe.src='/upload/image/';
    iframe.name = 'iframe-upload';
    iframe.style.display = 'none';
    iframe.id = 'id_upload_iframe';
    document.body.appendChild(iframe);

    document.getElementById('id_upload_iframe').onload = function (e) {
        uploadCallBack(e.target.contentWindow.document.body.innerHTML);
    }
}


/**
 * 上传
 * @returns {boolean}
 */
function uploadImg() {
    if (!verifySize() || !verifyType()) {
        return false;
    }
    createIframe();
    $(".upload-form").submit();
    $('#upload-label').removeAttr('for');
}

/**
 * 文件大小
 * @returns {boolean}
 */
function verifySize() {
    var fileInput = $("#upload-image")[0];
    var byteSize = fileInput.files[0].size;

    if (Math.ceil(byteSize / 1024) > 1024 * 2) {
        alert("上传图片大小不超过2M");
        return false;
    }
}

/**
 * 文件格式
 * @returns {boolean}
 */
function verifyType() {
    var filepath = $("#upload-image").val();
    var extStart = filepath.lastIndexOf('.');
    var ext = filepath.substring(extStart, filepath.length).toUpperCase();

    if (ext !== '.PNG' && ext !== '.JPG' && ext !== '.JPEG') {
        alert("上传文件格式仅支持PNG、JPG、JPEG图片");
        return false;
    }
}


