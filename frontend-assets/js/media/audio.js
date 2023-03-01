const mediaUtils = require('./media')
const DATA = {}

function stopAudio(scrollStory, id) {
  const audio = scrollStory.MURAL_AUDIO[id]
  DATA[id].active = false
  $(audio).finish()

  DATA[id].playPromise = DATA[id].playPromise.then(function () {
    return mediaUtils.fadeout(audio, DATA[id]).then(function () {
      // Allow it to restart from the beginning.
      if (!audio.loop) {
        audio.currentTime = 0
      }
    })
  })
}

function prepareAudio(scrollStory, id, srcs, attrs) {
  const audio = scrollStory.MURAL_AUDIO[id]
  audio.loop = !!attrs.loop
  audio.preload = 'auto'

  const sources = srcs.filter((src) => src.src !== undefined)
  const canPlayThrough = mediaUtils.canPlayThroughPromise(audio, sources)
  const timer = window.MURAL.default_auto_advance

  if (timer && attrs.timer) {
    const advanceStory = mediaUtils.addAutoAdvance(
      audio,
      scrollStory,
      id,
      attrs.timer === 'single'
    )

    if (advanceStory) {
      audio.addEventListener('play', (event) => {
        if (audio.duration < timer) {
          audio.loop = true
        }
        window.MURAL.timers[id] = setTimeout(advanceStory, timer * 1000)
      })
    }
  }

  audio.load()

  DATA[id] = { playPromise: canPlayThrough }
  return canPlayThrough
}

function removeBackgroundAudio(scrollStory, id) {
  stopAudio(scrollStory, id)
}

function playBackgroundAudio(scrollStory, item) {
  console.log('playing audio')
  const id = item.index
  const audio = scrollStory.MURAL_AUDIO[id]
  DATA[id].active = true
  $(audio).finish()

  DATA[id].playPromise = DATA[id].playPromise.then(function () {
    return mediaUtils.fadein(audio)
  })
}

module.exports = {
  playBackgroundAudio,
  prepareAudio,
  removeBackgroundAudio,
}
