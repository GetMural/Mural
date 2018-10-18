const mediaUtils = require('./media');

const MEDIA = [];
const DATA = [];

function stopAudio(id) {
  const audio = MEDIA[id];

  if (DATA[id].playPromise) {
    DATA[id].playPromise.then(() => {
      mediaUtils.fadeout(audio);
    });
  } else {
    mediaUtils.fadeout(audio);
  }
}

function prepareAudio (id, srcs) {
  const audio = new Audio();
  MEDIA[id] = audio;
  DATA[id] = {};
  audio.loop = true;
  audio.preload = 'auto';

  const canPlayThrough = mediaUtils.canPlayThroughPromise(audio, srcs);
  audio.load();

  return canPlayThrough;
}

function removeBackgroundAudio (id) {
  stopAudio(id);
}

function setMuted (id, muted) {
  const audio = MEDIA[id];
  if (audio) {
    audio.muted = muted;
  }
}

function playBackgroundAudio (id, attrs) {
  const audio = MEDIA[id];
  audio.muted = attrs.muted;
  DATA[id].playPromise = mediaUtils.fadein(audio);
}

module.exports = {
  playBackgroundAudio,
  prepareAudio,
  removeBackgroundAudio,
  setMuted
};
