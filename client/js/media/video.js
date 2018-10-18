const $ = require('jquery');
const mediaUtils = require('./media');
const Hls = require('hls.js');

const MEDIA = [];
const DATA = [];
const isMobile = window.isMobile;

const HSL_TYPE = 'application/vnd.apple.mpegurl';

function stopVideo(id) {
  const video = MEDIA[id];

  if (DATA[id].playPromise) {
    DATA[id].playPromise.then(() => {
      mediaUtils.fadeout(video);
    });
  } else {
    mediaUtils.fadeout(video);
  }
}

function playBackgroundVideo (id, attrs) {
  const video = MEDIA[id];

  video.loop = attrs.loop;
  video.muted = isMobile.any ? video.muted : attrs.muted;

  if ((!DATA[id].paused && attrs.autoplay) ||
      (DATA[id].playTriggered && !DATA[id].paused)) {
    DATA[id].playPromise = mediaUtils.fadein(video);
  }
}

function removeBackgroundVideo ($el, id) {
  const $container = $el.find('.video-container');
  $container.css('position', '');
  const video = MEDIA[id];
  stopVideo(id);
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
  video.muted = attrs.muted;
  video.preload = 'auto';
  video.setAttribute('webkit-playsinline', '');
  video.setAttribute('playsinline', '');
  MEDIA[id] = video;
  DATA[id] = {};
  let canPlayThrough

  const sources = srcs.filter(src => src.src !== undefined);
  const hslSource = sources.filter(src => src.type === HSL_TYPE)[0];
  const normalSources = sources.filter(src => src.type !== HSL_TYPE);

  if (hslSource && Hls.isSupported()) {
    canPlayThrough = new Promise(function(resolve, reject) {
      const hls = new Hls();
        hls.loadSource(hslSource.src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
          resolve();
        });
    });
  } else if (video.canPlayType(HSL_TYPE)) {
    canPlayThrough = new Promise(function(resolve, reject) {
      video.src = hslSource.src;
      video.addEventListener('loadedmetadata',function() {
        resolve();
      });
    });
  } else {
    canPlayThrough = mediaUtils.canPlayThroughPromise(video, normalSources);
  }

  $el.find('.video-container').append(video);

  $el.find('.play').click(function() {
    DATA[id].playPromise = mediaUtils.fadein(video);
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

  $el.find('.mobile-mute.muted').click(function() {
    setMuted(id, false);
    $(this).remove();
  });

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
  if (video) {
    video.muted = muted;
  } 
}

module.exports = {
  playBackgroundVideo,
  prepareVideo,
  removeBackgroundVideo,
  fixBackgroundVideo,
  unfixBackgroundVideo,
  setMuted
};
