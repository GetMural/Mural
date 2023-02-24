const mediaUtils = require('./media')
const DATA = {}

function stopAudio(scrollStory, id) {
  console.log('stopping audio')
  const audio = scrollStory.MURAL_AUDIO[id]
  DATA[id].active = false
  $(audio).finish()

  DATA[id].playPromise = DATA[id].playPromise.then(function () {
    return mediaUtils.fadeout(audio, DATA[id]).then(function () {
      // Allow it to restart from the beginning.
      if (!audio.loop) {
        console.log('start audio from beginning')
        audio.currentTime = 0
      }
    })
  })
}

function prepareAudio(scrollStory, id, srcs, attrs) {
  const audio = scrollStory.MURAL_AUDIO[id]
  audio.loop = !!attrs.loop
  console.log(`Audio looped? ${audio.loop}`)
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
      console.log('need to use a timer')

      if (audio.duration < timer) {
        console.log('looping shorter audio')
        audio.loop = true
      }

      audio.addEventListener('play', (event) => {
        console.log('setting timer')
        setTimeout(advanceStory, time * 1000)
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
