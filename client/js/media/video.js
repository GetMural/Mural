const MEDIA = [];
const DATA = [];

function insertBackgroundVideo ($el, id, srcs, attrs) {
  const video = prepareVideo($el, id, srcs, attrs);
  video.loop = attrs.loop;
  video.autoplay = (DATA[video].paused !== undefined) ? !DATA[video].paused : attrs.autoplay;
  video.muted = attrs.muted;
  video.poster = attrs.poster;
  video.currentTime = DATA[video].currentTime || 0;
  video.load();
}

// remove video to prevent more downloading if it won't be watched.
// store current time that had been reached.
function removeBackgroundVideo ($el, id) {
  const $container = $el.find('.video-container');
  $container.css('position', '');
  const video = MEDIA[id];
  DATA[video].currentTime = video.currentTime;
  video.innerHTML = '';
  video.removeAttribute('autoplay');
  video.load();
}

function fixBackgroundVideo ($el) {
  const $container = $el.find('.video-container');
  $container.css('position', 'fixed');
}

function unfixBackgroundVideo ($el) {
  const $container = $el.find('.video-container');
  $container.css('position', '');
}

function prepareVideo ($el, id, srcs, attrs) {
  let video;

  if (MEDIA[id]) {
    video = MEDIA[id];
  } else {
    video = document.createElement('video');
    DATA[video] = {};
    $el.find('.video-container').html(video);

    $el.find('.play').click(function() {
      video.play();
      DATA[video].paused = false;
      $(this).hide();
      $el.find('.pause').show();
    });

    $el.find('.pause').click(function() {
      video.pause();
      DATA[video].paused = true;
      $(this).hide();
      $el.find('.play').show();
    });

    if (attrs.autoplay === true) {
      $el.find('.play').hide();
    } else {
      $el.find('.pause').hide();
    }
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
