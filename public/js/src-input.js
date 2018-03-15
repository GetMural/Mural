var $ = jQuery;
$(function() {

    $('.src-input').each(function () {
        var value = $(this).val();
        var imgName = $(this).data('for');
        var previewImg = '#' + imgName + '-preview';
        if (value.length > 0) {
           // load the preview-thumb
           $(previewImg).attr('src', value);
        }
    });

    $('.fileupload-input').change(function (){
        var filename = $(this).val().split('\\').pop();
        var textFieldId = '#' + $(this).data('for');
        var previewImg = '#' + $(this).data('for').replace('[\[\]]', '-') + '-preview';
        var srcPath = '/uploads/' + filename;
        var data = new FormData();
        console.log(filename, textFieldId);
        data.append('upload-file', $(this).prop('files')[0]);
        $.ajax({
            url: '/upload',
            type: 'post',
            processData: false,
            contentType: false,
            data: data,
            dataType: 'json',
            success: function (response) {
                if (response.status === 'ok') {
                    console.log('Success upload', response);
                    // update the corresponding src text field with the relateive path
                    $(textFieldId).val(srcPath);
                    // and add a thumbnail to the preview
                    $(previewImg).attr('src', srcPath);
                } else {
                    console.log('Error uploading file', response);
                }
            }
        })
    });
});