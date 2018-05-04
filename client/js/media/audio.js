const MEDIA = [];
const DATA = [];

function stopAudio(id) {
  const audio = MEDIA[id];

  if (DATA[id].playPromise) {
    DATA[id].playPromise.then(() => {
      audio.pause();
    });
  } else {
    audio.pause();
  }
}

function prepareAudio (id, srcs) {
  const audio = new Audio();
  MEDIA[id] = audio;
  DATA[id] = {};
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

    const sources = srcs.filter(src => src.src !== undefined);
    sources.forEach((src, i) => {
      const source = document.createElement('source'); 
      source.type = src.type;
      source.src = src.src;
      audio.appendChild(source);

      // resolve if error on sources (404)
      if (i === sources.length - 1) {
        source.addEventListener('error', function(e) {
          resolve();
        });
      }
    });
  });

  audio.load();

  return canPlayThrough;
}

function removeBackgroundAudio (id) {
  stopAudio(id);
}

function setMuted (id, muted) {
  const audio = MEDIA[id];
  audio.muted = muted;
}

function playBackgroundAudio (id, attrs) {
  const audio = MEDIA[id];
  audio.muted = attrs.muted;
  DATA[id].playPromise = audio.play();
}

module.exports = {
  playBackgroundAudio,
  prepareAudio,
  removeBackgroundAudio,
  setMuted
};
