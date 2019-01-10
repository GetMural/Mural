const mediaUtils = require('./media');

const MEDIA = [];
const DATA = [];

function stopAudio(id) {
  const audio = MEDIA[id];
  $(audio).stop(true);
  DATA[id].active = false;

  if (audio.paused) {
    DATA[id].playPromise = null;
    return;
  }

  mediaUtils.fadeout(id, audio, function() {
    return DATA[id].active === false;
  });
}

function prepareAudio (id, srcs) {
  const audio = new Audio();
  MEDIA[id] = audio;
  DATA[id] = {};
  audio.loop = true;
  audio.preload = 'auto';

  const sources = srcs.filter(src => src.src !== undefined);
  const canPlayThrough = mediaUtils.canPlayThroughPromise(audio, sources);
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
  $(audio).stop(true);
  DATA[id].active = true;

  if (!audio.paused) {
    return;
  }

  audio.muted = attrs.muted;
  DATA[id].playPromise = mediaUtils.fadein(id, audio);
}

module.exports = {
  playBackgroundAudio,
  prepareAudio,
  removeBackgroundAudio,
  setMuted
};
