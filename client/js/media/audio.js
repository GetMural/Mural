const MEDIA = [];
const DATA = [];

function insertBackgroundAudio (scrollStory, $el, id, srcs, attrs) {
  MEDIA[id] = MEDIA[id] || new Audio();

  const audio = MEDIA[id];
  audio.loop = true;

  srcs.forEach((src) => {
    const source = document.createElement('source'); 
    source.type = src.type;
    source.src = src.src;
    audio.appendChild(source);
  });

  audio.load();
}

function removeBackgroundAudio ($el, id) {
  const audio = MEDIA[id];
  audio.innerHTML = '';
  audio.load();
}
