const mediaUtils = require('./media');

const MEDIA = [];
const DATA = [];

window.MEDIA = MEDIA;

function stopAudio(id) {
  const audio = MEDIA[id];
  DATA[id].active = false;

  if (audio.paused) {
    DATA[id].playPromise = null;
    return;
  }

  $(audio).stop(true);

  mediaUtils.fadeout(id, audio, function() {
    // Allow it to restart from the beginning.
    if (!audio.loop) {
      audio.currentTime = 0;
    } 
    return DATA[id].active === false;
  });
}

function prepareAudio (scrollStory, $el, id, srcs, attrs) {
  const audio = new Audio();
  MEDIA[id] = audio;
  DATA[id] = {};
  audio.loop = !!attrs.loop;
  audio.preload = 'auto';

  audio.addEventListener('ended', () => {
    // const count = scrollStory.getItems().length;
    // const next = id + 1;

    // if (next < count) {
    //   scrollStory.index(next);
    // }

    console.log("ended");

    $el.addClass('heard');

    // Allow it to restart from the beginning.
    audio.currentTime = 0;
  });

  const sources = srcs.filter(src => src.src !== undefined);
  const canPlayThrough = mediaUtils.canPlayThroughPromise(audio, sources, attrs.vtt);
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

function playBackgroundAudio (item, attrs) {
  const id = item.index;
  const audio = MEDIA[id];
  $(audio).stop(true);
  DATA[id].active = true;
  item.el.removeClass('heard');

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
