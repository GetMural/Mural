const VIMEO = {}

let loaded = false

function loadVimeo() {
  if (!loaded) {
    const tag = document.createElement('script')
    tag.src = 'https://player.vimeo.com/api/player.js'
    tag.onload = window.onVimeoReadyCallback
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    loaded = true
  }
}

const VimeoPromise = new Promise(function (resolve, reject) {
  window.onVimeoReadyCallback = function () {
    resolve()
  }
})

function setMuted(muted) {
  for (const index of Object.keys(VIMEO)) {
    VIMEO[index].setVolume(muted ? 0 : 1)
  }
}

function play(item, isSoundEnabled) {
  VIMEO[item.index].play()
}

function remove(item) {
  const $container = item.el.find('.video-container')
  $container.css('position', '')
  VIMEO[item.index].pause()
}

function stick(item) {
  const $container = item.el.find('.video-container')
  $container.css('position', 'fixed')
}

function prepare(scrollStory, item) {
  loadVimeo()

  const canPlayThrough = new Promise(function (resolve, reject) {
    VimeoPromise.then(function () {
      VIMEO[item.index] = new Vimeo.Player('vimeo_' + item.data.vimeoVideoId, {
        id: item.data.vimeoVideoId,
        responsive: true,
        autoplay: false,
        controls: item.data.hasOwnProperty('controls'),
      })

      // VIMEO[item.index].on('bufferstart', resolve)
      VIMEO[item.index].on('bufferend', resolve)
      VIMEO[item.index].on('error', resolve)
    })
  })
  return canPlayThrough
}

module.exports = {
  play,
  remove,
  stick,
  prepare,
  setMuted,
}
