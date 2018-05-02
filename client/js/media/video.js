const $ = require('jquery');

const MEDIA = [];
const DATA = [];

function playBackgroundVideo (id, attrs) {
  const video = MEDIA[id];

  video.loop = attrs.loop;
  video.muted = attrs.muted;

  if ((!DATA[id].paused && attrs.autoplay) ||
      (DATA[id].playTriggered && !DATA[id].paused)) {
    video.play();
  }
}

function removeBackgroundVideo ($el, id) {
  const $container = $el.find('.video-container');
  $container.css('position', '');
  const video = MEDIA[id];
  video.removeAttribute('autoplay');
  video.pause();
}

function fixBackgroundVideo ($el) {
  const $container = $el.find('.video-container');
  $container.css('position', 'fixed');
}

function unfixBackgroundVideo ($el) {
  const $container = $el.find('.video-container');
  $container.css('position', '');
}

function prepareVideo (scrollStory, $el, id, srcs, attrs) {
  const video = document.createElement('video');
  video.poster = attrs.poster;
  video.preload = 'auto';
  MEDIA[id] = video;
  DATA[id] = {};

  const canPlayThrough = new Promise(function(resolve, reject) {
    video.addEventListener('canplaythrough', () => {
      resolve();
    });

    video.addEventListener('loadeddata', function (e) {
      if (this.readyState > 3) {
        resolve();
      }
    });
  });

  srcs.forEach((src) => {
    if (src.src !== undefined) {
      const source = document.createElement('source'); 
      source.type = src.type;
      source.src = src.src;
      video.appendChild(source);
    }
  });

  $el.find('.video-container').html(video);

  $el.find('.play').click(function() {
    video.play();
    DATA[id].paused = false;
    DATA[id].playTriggered = true;
    $(this).hide();
    $el.find('.pause').show();
  });

  $el.find('.pause').click(function() {
    // TODO check for cancelling problems with promises
    video.pause();
    DATA[id].paused = true;
    $(this).hide();
    $el.find('.play').show();
  });

  if (attrs.autoplay === true) {
    $el.find('.play').hide();
  } else {
    $el.find('.pause').hide();
  }

  if (attrs.autoAdvance) {
    video.addEventListener('ended', () => {
      const count = scrollStory.getItems().length;
      const next = id + 1;

      if (next < count) {
        scrollStory.index(id + 1);
      }

      // Allow it to restart from the beginning.
      video.currentTime = 0;
    });
  }

  video.load();

  return canPlayThrough;
}

function setMuted (id, muted) {
  const video = MEDIA[id];
  video.muted = muted;
}

module.exports = {
  playBackgroundVideo,
  prepareVideo,
  removeBackgroundVideo,
  fixBackgroundVideo,
  unfixBackgroundVideo,
  setMuted
};
