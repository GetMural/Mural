const mediaUtils = require('./media')

const MEDIA = []
const DATA = []

function stopAudio(id) {
  const audio = MEDIA[id]
  DATA[id].active = false

  if (audio.paused) {
    DATA[id].playPromise = null
    return
  }

  audio.pause()

  mediaUtils.fadeout(audio, function () {
    // Allow it to restart from the beginning.
    if (!audio.loop) {
      audio.currentTime = 0
    }
    return DATA[id].active === false
  })
}

function prepareAudio(scrollStory, $el, id, srcs, attrs) {
  const audio = scrollStory.MURAL_AUDIO[id]
  MEDIA[id] = audio
  DATA[id] = {}
  audio.loop = !!attrs.loop
  audio.preload = 'auto'

  const sources = srcs.filter((src) => src.src !== undefined)
  const canPlayThrough = mediaUtils.canPlayThroughPromise(audio, sources)
  audio.load()

  return canPlayThrough
}

function removeBackgroundAudio(id) {
  stopAudio(id)
}

function setMuted(id, muted) {
  const audio = MEDIA[id]
  if (audio) {
    audio.muted = muted
  }
}

function playBackgroundAudio(item, attrs) {
  const id = item.index
  const audio = MEDIA[id]
  DATA[id].active = true

  audio.pause()

  if (!audio.paused) {
    return
  }

  audio.muted = attrs.muted
  DATA[id].playPromise = mediaUtils.fadein(audio)
}

module.exports = {
  playBackgroundAudio,
  prepareAudio,
  removeBackgroundAudio,
  setMuted,
}
