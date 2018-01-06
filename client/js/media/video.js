function insertBackgroundVideo ($el, srcs, active=true) {
  const $container = $el.find('.video-container');
  const video = $container.find('video')[0];
  video.loop = true;
  video.autoplay = true;

  srcs.forEach((src) => {
    const source = document.createElement('source'); 
    source.type = src.type;
    source.src = src.src;
    video.appendChild(source);
  });

  video.load();
}

// remove video to prevent more downloading if it won't be watched.
function removeBackgroundVideo ($el) {
  const $container = $el.find('.video-container');
  $container.css('position', '');
  const video = $container.find('video')[0];
  video.innerHTML = '';
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

module.exports = {
  insertBackgroundVideo,
  removeBackgroundVideo,
  fixBackgroundVideo,
  unfixBackgroundVideo
};
