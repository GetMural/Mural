/* eslint-env browser */
/* globals $ */

let $story;

function loadItem(item) {
  const video = item.el.find('video').get(0);

  return new Promise((resolve, reject) => {
    video.addEventListener('loadeddata', function() {
      if (video.readyState > 3) {
        resolve();
      }
    });
    video.addEventListener('canplaythrough', function() {
      resolve();
    });
    video.addEventListener('error', function() {
      reject();
    });

    const timeRanges = video.buffered;

    if (timeRanges.length) {
      resolve();
    }
  }).then(() => {
    video.play();
  });
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
  const item = $story.data('plugin_scrollStory').getActiveItem();
  loadItem(item);
};
