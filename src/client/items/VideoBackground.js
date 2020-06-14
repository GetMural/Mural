/* eslint-env browser */
/* globals $ */

let videos = [];
let loadPromises = [];
let playoutPromise = Promise.resolve();
// keep track of active status in case of timing issues with scrolling and async playback.
let ACTIVE = [];
let $story;

let firstLoad = true;

function loadItem(item) {
  const index = item.index;
  if (loadPromises[index]) {
    return;
  }
  console.log('LOAD');
  console.log(index);
  const video = item.el.find('video').get(0);
  const timeRanges = video.buffered;
  console.log(timeRanges);

  if (timeRanges.length) {
    console.log(timeRanges.start(0));
    console.log(timeRanges.end(0));
  }

  loadPromises[index] = new Promise((resolve, reject) => {
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
  });
  videos[index] = video;
}

async function activateItem(item) {
  const index = item.index;
  console.log('ACTIVE');
  console.log(index);
  await loadPromises[index];
  console.log(`PLAYING video ${index}`);
  playoutPromise = videos[index].play();
}

async function deactivateItem(item) {
  const index = item.index;
  console.log('DEACTIVE');
  console.log(item);
  await loadPromises[index];
  console.log(`PAUSING video ${index}`);
  videos[index].pause();
}

// code needed to bootstrap editor preview
$(document).ready(function() {
  $story = $('#scrollytelling');

  $story
    .scrollStory({
      contentSelector: '.part',
      triggerOffset: 0,
      debug: true,
      autoActivateFirstItem: true,
      containeractive: function() {
        if (firstLoad) {
          console.log('CONTAINER ACTIVE');
          const item = this.getActiveItem();
          loadItem(item);
          activateItem(item);
          firstLoad = false;
        }
      },
    })
    .data('plugin_scrollStory');

  $story.on('itementerviewport', function(ev, item) {
    console.log('itementerviewport');
    loadItem(item);
    console.log(loadPromises);
    console.log(videos);
  });

  $story.on('itemfocus', function(ev, item) {
    console.log('itemfocus');
    activateItem(item);
  });

  $story.on('itemblur', function(ev, item) {
    console.log('itemblur');
    deactivateItem(item);
  });
});

// code needed to refresh editor preview
window.refresh = function() {
  console.log('REFRESHING');
  const item = $story.data('plugin_scrollStory').getActiveItem();
  loadItem(item);
  activateItem(item);
};
