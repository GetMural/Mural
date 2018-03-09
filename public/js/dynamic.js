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
