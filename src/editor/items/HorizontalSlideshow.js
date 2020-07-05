/* eslint-env browser */
/* globals $ */
import blueimp from 'blueimp-gallery/js/blueimp-gallery';

function loadItem(item) {
  const slides = item.el.find('.slide-container a').get();

  return blueimp(slides, {
    container: item.el.find('.blueimp-gallery')[0],
    carousel: true,
    titleElement: '.slide-caption',
    srcsetProperty: 'urlset',
    startSlideshow: false,
    onslide(index, slide) {
      const text = this.list[index].getAttribute('data-credits');
      const node = this.container.find('.credits');
      node.empty();
      if (text) {
        node[0].appendChild(document.createTextNode(text));
      }
    },
  });
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

  const storyItems = scrollStory.getItems();
  window.draftItem = storyItems[0];
  window.Gallery = loadItem(window.draftItem);
});

// code needed to refresh editor preview
window.refresh = function() {
  window.draftItem.el
    .find('.blueimp-gallery')
    .removeClass('blueimp-gallery-single');
  window.Gallery = loadItem(window.draftItem);
};
