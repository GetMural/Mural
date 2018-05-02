const MEDIA = [];
const DATA = [];

function prepareAudio (id, srcs) {
  const audio = new Audio();
  MEDIA[id] = audio;
  audio.loop = true;
  audio.preload = 'auto';

  const canPlayThrough = new Promise(function(resolve, reject) {
    audio.addEventListener('canplaythrough', () => {
      resolve();
    });

    audio.addEventListener('loadeddata', function (e) {
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
      audio.appendChild(source);
    }
  });

  audio.load();

  return canPlayThrough;
}

function removeBackgroundAudio (id) {
  const audio = MEDIA[id];
  audio.pause();
}

function setMuted (id, muted) {
  const audio = MEDIA[id];
  audio.muted = muted;
}

function playBackgroundAudio (id, attrs) {
  const audio = MEDIA[id];
  audio.muted = attrs.muted;
  audio.play();
}

module.exports = {
  playBackgroundAudio,
  prepareAudio,
  removeBackgroundAudio,
  setMuted
};
