/* eslint-env browser */
/* globals $ */

import 'stickybits/src/jquery.stickybits';

let $story;
let stickybitsInstance;

function loadItem(item) {
  stickybitsInstance = item.el.find('.bg-image').stickybits();
}

// code needed to bootstrap editor preview
$(document).ready(function() {
  $story = $('#scrollytelling');

  $story
    .scrollStory({
      contentSelector: '.part',
      triggerOffset: 0,
      autoActivateFirstItem: true,
      containeractive: function() {
        const item = this.getActiveItem();
        loadItem(item);
      },
    })
    .data('plugin_scrollStory');
});

// code needed to refresh editor preview
window.refresh = function() {
  stickybitsInstance.cleanup();
  const item = $story.data('plugin_scrollStory').getActiveItem();
  loadItem(item);
};
