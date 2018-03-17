const MEDIA = [];
const DATA = [];

function insertBackgroundAudio (scrollStory, $el, id, srcs, attrs) {
  const audio = new Audio();
  MEDIA[id] = audio;
  audio.loop = true;

  srcs.forEach((src) => {
    const source = document.createElement('source'); 
    source.type = src.type;
    source.src = src.src;
    audio.appendChild(source);
  });

  audio.play();
}

function removeBackgroundAudio ($el, id) {
  const audio = MEDIA[id];
  audio.pause();
  audio.innerHTML = '';
  audio.load();
  MEDIA[id] = null;
}

module.exports = {
  insertBackgroundAudio,
  removeBackgroundAudio
};
