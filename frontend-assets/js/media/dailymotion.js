const DAILYMOTION = {}

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
    console.log('DailyMotionPromise')
    resolve()
  }
})

function setMuted(muted) {
  for (const index of Object.keys(DAILYMOTION)) {
    DAILYMOTION[index].setMuted(muted)
  }
}

function play(item, isSoundEnabled) {
  DAILYMOTION[item.index].play()
}

function remove(item) {
  const $container = item.el.find('.video-container')
  $container.css('position', '')
  DAILYMOTION[item.index].pause()
}

function stick(item) {
  const $container = item.el.find('.video-container')
  $container.css('position', 'fixed')
}

function prepare(scrollStory, item) {
  loadDailyMotion()

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
                const id = item.index
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

  return canPlayThrough
}

module.exports = {
  play,
  remove,
  stick,
  prepare,
  setMuted,
}
