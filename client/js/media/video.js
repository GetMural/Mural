const MEDIA = [];

function insertBackgroundVideo ($el, id, srcs, attrs) {
  const video = prepareVideo($el, id, srcs);
  video.loop = attrs.loop;
  video.autoplay = attrs.autoplay;
  video.muted = attrs.muted;
  video.poster = attrs.poster;
  video.currentTime = attrs.currentTime;
  video.load();
}

// remove video to prevent more downloading if it won't be watched.
// store current time that had been reached.
function removeBackgroundVideo ($el, id) {
  const $container = $el.find('.video-container');
  $container.css('position', '');
  const video = MEDIA[id];
  const currentTime = video.currentTime;
  video.removeAttribute('autoplay');
  video.innerHTML = '';
  video.load();

  return {
    currentTime: currentTime
  };
}

function fixBackgroundVideo ($el) {
  const $container = $el.find('.video-container');
  $container.css('position', 'fixed');
}

function unfixBackgroundVideo ($el) {
  const $container = $el.find('.video-container');
  $container.css('position', '');
}

function prepareVideo ($el, id, srcs) {
  let video;

  if (MEDIA[id]) {
    video = MEDIA[id];
  } else {
    video = document.createElement('video');
    $el.find('.video-container').html(video);
  }

  srcs.forEach((src) => {
    const source = document.createElement('source'); 
    source.type = src.type;
    source.src = src.src;
    video.appendChild(source);
  });

  video.preload = 'auto';
  MEDIA[id] = video;

  return video;
}

function setMuted (id, muted) {
  const video = MEDIA[id];
  video.muted = muted;
}

module.exports = {
  insertBackgroundVideo,
  prepareVideo,
  removeBackgroundVideo,
  fixBackgroundVideo,
  unfixBackgroundVideo,
  setMuted
};
