/* eslint-env browser */
/* globals $ */
const Hls = require('hls.js');
const mediaUtils = require('./media');

const MEDIA = [];
const DATA = [];
const HSL_TYPE = 'application/vnd.apple.mpegurl';

function stopVideo(id) {
  const video = MEDIA[id];
  $(video).stop(true);
  DATA[id].active = false;

  if (video.paused) {
    DATA[id].playPromise = null;
    return;
  }

  mediaUtils.fadeout(id, video, function() {
    return DATA[id].active === false;
  });
}

function playBackgroundVideo(id, attrs) {
  const video = MEDIA[id];
  $(video).stop(true);

  if (!video.paused) {
    DATA[id].active = true;
    return;
  }

  video.loop = attrs.loop;
  video.muted = attrs.muted;

  if (
    (!DATA[id].paused && attrs.autoplay) ||
    (DATA[id].playTriggered && !DATA[id].paused)
  ) {
    DATA[id].playPromise = mediaUtils.fadein(id, video);
    DATA[id].active = true;
  }
}

function removeBackgroundVideo($el, id) {
  const $container = $el.find('.video-container');
  $container.css('position', '');
  stopVideo(id);
}

function fixBackgroundVideo($el) {
  const $container = $el.find('.video-container');
  $container.css('position', 'fixed');
}

function prepareVideo(scrollStory, $el, id, srcs, attrs) {
  const video = document.createElement('video');
  video.poster = attrs.poster;
  video.muted = attrs.muted;
  video.preload = 'auto';
  video.setAttribute('webkit-playsinline', '');
  video.setAttribute('playsinline', '');
  MEDIA[id] = video;
  DATA[id] = {};
  let canPlayThrough;

  const sources = srcs.filter(src => src.src !== undefined);
  const hslSource = sources.filter(src => src.type === HSL_TYPE)[0];
  const normalSources = sources.filter(src => src.type !== HSL_TYPE);

  if (hslSource && Hls.isSupported()) {
    canPlayThrough = new Promise(function(resolve, reject) {
      const hls = new Hls();
      hls.loadSource(hslSource.src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        resolve();
      });
    });
  } else if (hslSource && video.canPlayType(HSL_TYPE)) {
    canPlayThrough = new Promise(function(resolve, reject) {
      video.src = hslSource.src;
      video.addEventListener('loadedmetadata', function() {
        resolve();
      });
    });
  } else {
    canPlayThrough = mediaUtils.canPlayThroughPromise(
      video,
      normalSources,
    );
  }

  $el.find('.video-container').append(video);

  $el.find('.play').click(function() {
    DATA[id].playPromise = mediaUtils.fadein(id, video);
    DATA[id].paused = false;
    DATA[id].playTriggered = true;
    $(this).hide();
    $el.find('.pause').show();
  });

  $el.find('.pause').click(function() {
    stopVideo(id);
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
        scrollStory.index(next);
      }

      // Allow it to restart from the beginning.
      video.currentTime = 0;
    });
  }

  video.load();

  return canPlayThrough;
}

function setMuted(id, muted) {
  const video = MEDIA[id];
  if (video) {
    video.muted = muted;
  }
}

export default {
  playBackgroundVideo,
  prepareVideo,
  removeBackgroundVideo,
  fixBackgroundVideo,
  setMuted,
};
