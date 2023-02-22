const Hls = require('hls.js')
const mediaUtils = require('./media')

const DATA = {}
const HSL_TYPE = 'application/vnd.apple.mpegurl'

function getVideoAttrs(item) {
  return {
    poster: item.data.poster,
    autoAdvance: item.data.autoAdvance,
    timer: item.data.timer,
  }
}

function fadeOut(id, video) {
  $(video).finish()

  if (DATA[id].paused || !DATA[id].active) {
    DATA[id].playPromise = DATA[id].playPromise.then(function () {
      return mediaUtils.fadeout(video, DATA[id])
    })
  }
}

function stopVideo(scrollStory, id) {
  const video = scrollStory.MURAL_VIDEO[id]
  DATA[id].active = false
  fadeOut(id, video)
}

function fadeIn(id, video) {
  $(video).finish()

  if (
    (!DATA[id].paused && video.paused) ||
    (!DATA[id].paused && DATA[id].active && video.paused)
  ) {
    DATA[id].playPromise = DATA[id].playPromise.then(function () {
      return mediaUtils.fadein(video)
    })
  }
}

function playBackgroundVideo(scrollStory, item) {
  const id = item.index
  const video = scrollStory.MURAL_VIDEO[id]
  DATA[id].active = true
  DATA[id].paused = false

  fadeIn(id, video)
  item.el.find('.play').hide()
  item.el.find('.pause').show()
}

function removeBackgroundVideo(scrollStory, item) {
  const $container = item.el.find('.video-container')
  $container.css('position', '')

  stopVideo(scrollStory, item.index)
  item.el.find('.pause').hide()
  item.el.find('.play').show()
}

function fixBackgroundVideo($el) {
  const $container = $el.find('.video-container')
  $container.css('position', 'fixed')
}

function prepareVideo(scrollStory, $el, id, srcs, attrs) {
  let video = scrollStory.MURAL_VIDEO[id]
  if (attrs.poster) {
    video.poster = attrs.poster
  }
  video.preload = 'auto'
  video.setAttribute('webkit-playsinline', '')
  video.setAttribute('playsinline', '')

  let canPlayThrough

  const sources = srcs.filter((src) => src.src !== undefined)
  const hslSource = sources.filter((src) => src.type === HSL_TYPE)[0]
  const normalSources = sources.filter((src) => src.type !== HSL_TYPE)

  if (Hls && hslSource && Hls.isSupported()) {
    canPlayThrough = new Promise(function (resolve, reject) {
      const hls = new Hls()
      hls.loadSource(hslSource.src)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        resolve()
      })
    })
  } else if (Hls && hslSource && video.canPlayType(HSL_TYPE)) {
    canPlayThrough = new Promise(function (resolve, reject) {
      video.src = hslSource.src
      video.addEventListener('loadedmetadata', function () {
        resolve()
      })
    })
  } else {
    canPlayThrough = mediaUtils.canPlayThroughPromise(video, normalSources)
  }

  $el.find('.video-container').append(video)

  $el.find('.play').click(function () {
    DATA[id].paused = false
    fadeIn(id, video)

    $(this).hide()
    $el.find('.pause').show()
  })

  $el.find('.pause').click(function () {
    DATA[id].paused = true
    fadeOut(id, video)

    $(this).hide()
    $el.find('.play').show()
  })

  // TODO refactor this at some point when fadein/fadeout are all handled by a general media class.
  if (attrs.autoAdvance || attrs.timer) {
    const advanceStory = mediaUtils.addAutoAdvance(
      video,
      scrollStory,
      id,
      attrs.autoAdvance || attrs.timer === 'single'
    )

    if (advanceStory) {
      console.log('need to use a timer')
      const time = window.MURAL.default_auto_advance
      video.addEventListener('play', (event) => {
        console.log('setting timer')
        setTimeout(advanceStory, time * 1000)
      })
    }
  }

  video.load()
  DATA[id] = { playPromise: canPlayThrough }
  return canPlayThrough
}

module.exports = {
  playBackgroundVideo,
  prepareVideo,
  removeBackgroundVideo,
  fixBackgroundVideo,
  getVideoAttrs,
}
