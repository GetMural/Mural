const DAILYMOTION = {}
const DATA = {}

let loaded = false

function loadDailyMotion() {
  if (!loaded) {
    const tag = document.createElement('script')
    tag.async = true
    tag.src = 'https://api.dmcdn.net/all.js'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    loaded = true
  }
}

const DailyMotionPromise = new Promise(function (resolve, reject) {
  window.dmAsyncInit = function () {
    resolve()
  }
})

function setMuted(muted) {
  for (const index of Object.keys(DAILYMOTION)) {
    DAILYMOTION[index].setMuted(muted)
  }
}

function play(item, isSoundEnabled) {
  const id = item.index
  DATA[id].active = true

  DATA[id].playPromise = DATA[id].playPromise.then(function () {
    const player = DAILYMOTION[id]
    const active = DATA[id].active

    if (isSoundEnabled) {
      player.setMuted(false)
    } else {
      player.setMuted(true)
    }

    if (active) {
      player.play()
    } else {
      player.pause()
    }
  })
}

function remove(item) {
  const id = item.index
  DATA[id].active = false

  const $container = item.el.find('.video-container')
  $container.css('position', '')

  DATA[id].playPromise = DATA[id].playPromise.then(function () {
    const player = DAILYMOTION[id]
    const active = DATA[id].active

    if (active) {
      player.play()
    } else {
      player.pause()
    }
  })
}

function stick(item) {
  const $container = item.el.find('.video-container')
  $container.css('position', 'fixed')
}

function prepare(scrollStory, item) {
  loadDailyMotion()
  const id = item.index

  const canPlayThrough = new Promise(function (resolve, reject) {
    DailyMotionPromise.then(function () {
      const autoAdvance = item.data.autoAdvance
      const player = DM.player(
        document.getElementById('dm_' + item.data.dailymotionId),
        {
          video: item.data.dailymotionId,
          width: '100%',
          height: '100%',
          params: {
            controls: !!item.data.controls,
            autoplay: false,
            mute: false,
            loop: true,
          },
          events: {
            video_end: function () {
              if (autoAdvance) {
                const count = scrollStory.getItems().length
                const next = id + 1

                if (next < count) {
                  player.pause()
                  scrollStory.index(next)
                }
              }
            },
          },
        }
      )

      player.addEventListener('playback_ready', resolve)
      player.addEventListener('error', resolve)

      DAILYMOTION[item.index] = player
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
