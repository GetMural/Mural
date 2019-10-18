/* eslint-env browser */
/* globals $ */
import 'scrollstory/jquery.scrollstory';
import blueimp from 'blueimp-gallery/js/blueimp-gallery';

function loadItem(item) {
  const slides = item.el.find('.slide-container a').get();

  blueimp(slides, {
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

$(document).ready(function() {
  const $story = $('#scrollytelling');

  const scrollStory = $story
    .scrollStory({
      contentSelector: '.part',
      triggerOffset: 0,
    })
    .data('plugin_scrollStory');

  const storyItems = scrollStory.getItems();
  loadItem(storyItems[0]);
});
