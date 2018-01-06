function insertBackgroundVideo ($el, srcs) {
  const video = document.createElement('video');
  video.autoplay = true;
  video.loop = true;

  srcs.forEach((src) => {
    const source = document.createElement('source'); 
    source.type = src.type;
    source.src = src.src;
    video.appendChild(source);
  });

  $el.find('.video-container').append(video);
}

// remove video to prevent more downloading if it won't be watched.
function removeBackgroundVideo () {

}

module.exports = {
  insertBackgroundVideo,
  removeBackgroundVideo
};
