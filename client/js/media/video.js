function insertBackgroundVideo ($el, srcs, active=true) {
  const $container = $el.find('.video-container');
  const video = $container.find('video')[0];
  video.loop = true;

  srcs.forEach((src) => {
    const source = document.createElement('source'); 
    source.type = src.type;
    source.src = src.src;
    video.appendChild(source);
  });

  $el.find('.video-container').append(video);
  video.play();
}

// remove video to prevent more downloading if it won't be watched.
function removeBackgroundVideo ($el) {
  const video = $el.find('.video-container video')[0];
  video.innerHTML = '';
  video.pause();
}

function fixBackgroundVideo ($el) {
  const $container = $el.find('.video-container');
  $container.css('position', 'fixed');
}

function unfixBackgroundVideo () {
  const $container = $el.find('.video-container');
  $container.css('position', 'absolute');
}

module.exports = {
  insertBackgroundVideo,
  removeBackgroundVideo,
  fixBackgroundVideo,
  unfixBackgroundVideo
};
