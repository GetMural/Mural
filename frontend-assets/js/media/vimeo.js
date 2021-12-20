const VIMEO = {}
const DATA = {}

let loaded = false

function loadVimeo() {
  if (!loaded) {
    const tag = document.createElement('script')
    tag.async = true
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
  const id = item.index
  DATA[id].active = true

  DATA[id].playPromise = DATA[id].playPromise.then(function () {
    const player = VIMEO[id]
    player.setVolume(isSoundEnabled ? 1 : 0)
    return player.getPaused().then(function (paused) {
      const active = DATA[id].active
      if (paused && active) {
        return player.play()
      } else if (!paused && !active) {
        return player.pause()
      }
    })
  })
}

function remove(item) {
  const id = item.index
  DATA[id].active = false

  const $container = item.el.find('.video-container')
  $container.css('position', '')

  DATA[id].playPromise = DATA[id].playPromise.then(function () {
    const player = VIMEO[id]

    return player.getPaused().then(function (paused) {
      const active = DATA[id].active
      if (paused && active) {
        return player.play()
      } else if (!paused && !active) {
        return player.pause()
      }
    })
  })
}

function stick(item) {
  const $container = item.el.find('.video-container')
  $container.css('position', 'fixed')
}

function prepare(scrollStory, item) {
  loadVimeo()
  const id = item.index

  const canPlayThrough = new Promise(function (resolve, reject) {
    VimeoPromise.then(function () {
      const autoAdvance = item.data.autoAdvance
      const player = new Vimeo.Player('vimeo_' + item.data.vimeoVideoId, {
        id: item.data.vimeoVideoId,
        responsive: true,
        autoplay: false,
        controls: !!item.data.controls,
      })

      player.on('loaded', resolve)
      player.on('error', resolve)

      player.on('ended', function () {
        if (autoAdvance) {
          const count = scrollStory.getItems().length
          const next = id + 1

          if (next < count) {
            scrollStory.index(next)
          }
        }
      })

      VIMEO[id] = player
    })
  })

  DATA[id] = { playPromise: canPlayThrough }
  return canPlayThrough
}

module.exports = {
  play,
  remove,
  stick,
  prepare,
  setMuted,
}
