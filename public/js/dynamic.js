var $ = jQuery;
const itemEditor = $('#item-editor');

itemEditor.on('click', '.js-Remove', function (e) {
  e.preventDefault();
  $(this).parents('.js-Dynamic').remove();
  updateIndices();
});

itemEditor.on('click', '.js-AddSlide', function (e) {
  e.preventDefault();
  addDynamic('slide', 'images');
});

itemEditor.on('click', '.js-AddImage', function (e) {
  e.preventDefault();
  addDynamic('snippetimage', 'snippets');
});

function addDynamic(template, name) {
  const el = document.createElement('div');
  const fragment = `/editor/fragment/${template}`;
  $(el).load(fragment, function () {
    itemEditor.find('.js-ContentDynamic').append($(el).html());
    updateIndices(name);
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
