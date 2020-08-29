/* eslint-env browser */
/* globals $ */

import 'stickybits/src/jquery.stickybits';

let stickybitsInstance;

// code needed to bootstrap editor preview
$(document).ready(function() {
  const $story = $('#scrollytelling');

  $story
    .scrollStory({
      contentSelector: '.part',
      triggerOffset: 0,
      autoActivateFirstItem: true,
      containeractive: function() {
        const item = this.getActiveItem();
        stickybitsInstance = item.el.find('.bg-image').stickybits();
      },
    })
    .data('plugin_scrollStory');
});

// code needed to refresh editor preview
window.refresh = function() {
  stickybitsInstance.cleanup();
};
