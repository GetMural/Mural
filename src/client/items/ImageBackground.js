function loadItem(item) {}

function activateItem(item) {
  item.el.find('.bg-image').addClass('fixed');
}

function deactivateItem(item) {
  item.el.find('.bg-image').removeClass('fixed');
}

// code needed to bootstrap editor preview
$(document).ready(function() {
  const $story = $('#scrollytelling');

  const scrollStory = $story
    .scrollStory({
      contentSelector: '.part',
      triggerOffset: 0,
    })
    .data('plugin_scrollStory');

  $story.on('itementerviewport', function(ev, item) {
    loadItem(item);
  });

  $story.on('itemfocus', function(ev, item) {
    activateItem(item);
  });

  $story.on('itemblur', function(ev, item) {
    deactivateItem(item);
  });

  const storyItems = scrollStory.getItems();
  console.log(storyItems);
  window.draftItem = storyItems[0];
});

// code needed to refresh editor preview
window.refresh = function() {};
