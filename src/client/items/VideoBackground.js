/* eslint-env browser */
/* globals $ */

let video;
let loadPromise;
let playoutPromise = Promise.resolve();
// keep track of active status in case of timing issues with scrolling and async playback.
let ACTIVE = false;
let $story;

function loadItem(item) {
  video = item.el.find('video').get(0);
  loadPromise = new Promise((resolve, reject) => {
    video.addEventListener('canplay', function() {
      resolve();
    });
    video.addEventListener('error', function() {
      reject();
    });
  });
}

async function activateItem(item) {
  ACTIVE = true;
  await loadPromise;
  await playoutPromise;
  if (ACTIVE === true) {
    playoutPromise = video.play();
  }
}

async function deactivateItem(item) {
  ACTIVE = false;
  await loadPromise;
  await playoutPromise;
  if (ACTIVE === false) {
    video.pause();
    playoutPromise = Promise.resolve();
  }
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
        activateItem(item);
      },
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
});

// code needed to refresh editor preview
window.refresh = function() {
  const item = $story.data('plugin_scrollStory').getActiveItem();
  loadItem(item);
  activateItem(item);
};
