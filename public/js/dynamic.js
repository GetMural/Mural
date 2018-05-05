var $ = jQuery;
const itemEditor = $('#item-editor');

itemEditor.on('click', '.js-Remove', function (e) {
  e.preventDefault();
  $(this).parents('.js-Dynamic').remove();
  updateIndices();
});

itemEditor.on('click', '.js-AddSlide', function (e) {
  e.preventDefault();
  addDynamic('slide', 'images', $('.js-Slide').length);
});

itemEditor.on('click', '.js-AddImage', function (e) {
  e.preventDefault();
  addDynamic('snippetimage', 'snippets', $('.js-SnippetImage').length);
});

function addDynamic(template, name, index) {
  const el = document.createElement('div');
  const fragment = `/editor/fragment/${template}?index=${index}`;
  $(el).load(fragment, function () {
    itemEditor.find('.js-ContentDynamic').append($(el).html());
  });
}

function updateIndices(prefix) {
  itemEditor.find('.js-Dynamic').each(function (i) {
    $(this).find(`[name*='${prefix}']`).each(function () {
      const name = $(this).attr('name');
      $(this).attr('name', name.replace(/\[\d?\]/, `[${i}]`));
    });
  });
}

itemEditor.on('change', '.fileupload-input', function (){
  var filename = $(this).val().split('\\').pop();
  var textFieldId = '#' + $(this).data('for');
  var previewImg = '#' + $(this).data('for').replace('[\[\]]', '-') + '-preview';
  var data = new FormData();

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
              // update the corresponding src text field with the relative path
              $(textFieldId).val(response.path);

              // and add a thumbnail to the preview
              if (/^uploads\//.test(response.path)) {
                $(previewImg).attr('src', `/${response.path}`);
              } else {
                $(previewImg).attr('src', `${response.path}`);
              }            
              
          } else {
              console.log('Error uploading file');
              console.log(response.error);
          }
      }
  })
});
