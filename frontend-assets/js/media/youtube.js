const YOUTUBE = {}
const DATA = {}

let loaded = false

function loadYouTube() {
  if (!loaded) {
    const tag = document.createElement('script')
    tag.async = true
    tag.src = 'https://www.youtube.com/player_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    loaded = true
  }
}

const YouTubePromise = new Promise(function (resolve, reject) {
  window.onYouTubePlayerAPIReady = function () {
    resolve()
  }
})

window.addEventListener('resize', function () {
  Object.keys(YOUTUBE).forEach(function (ytid) {
    YOUTUBE[ytid].setSize(window.innerWidth, window.innerHeight)
  })
})

function getYoutubeId(item) {
  const videoId = item.data.youtubeId
  return `ytplayer_${videoId}`
}

function setMuted(muted) {
  Object.keys(YOUTUBE).forEach(function (ytid) {
    const player = YOUTUBE[ytid]
    if (muted) {
      player.mute()
    } else {
      player.unMute()
    }
  })
}

function play(item, isSoundEnabled) {
  const id = item.index
  DATA[id].active = true
  const youtube_id = getYoutubeId(item)

  DATA[id].playPromise = DATA[id].playPromise.then(function () {
    const player = YOUTUBE[youtube_id]
    const active = DATA[id].active

    if (isSoundEnabled) {
      player.unMute()
    } else {
      player.mute()
    }

    if (active) {
      player.playVideo()
    } else {
      player.pauseVideo()
    }
  })
}

function remove(item) {
  const id = item.index
  DATA[id].active = false
  const youtube_id = getYoutubeId(item)

  const $container = item.el.find('.video-container')
  $container.css('position', '')

  DATA[id].playPromise = DATA[id].playPromise.then(function () {
    const player = YOUTUBE[youtube_id]
    const active = DATA[id].active

    if (active) {
      player.playVideo()
    } else {
      player.pauseVideo()
    }
  })
}

function stick(item) {
  const $container = item.el.find('.video-container')
  $container.css('position', 'fixed')
}

function prepare(scrollStory, item) {
  loadYouTube()

  const videoId = item.data.youtubeId
  const autoAdvance = item.data.autoAdvance
  const id = item.index
  const youtube_id = getYoutubeId(item)
  const controls = item.data.controls ? 1 : 0

  const canPlayThrough = new Promise(function (resolve, reject) {
    YouTubePromise.then(function () {
      YOUTUBE[youtube_id] = new YT.Player(youtube_id, {
        width: window.innerWidth,
        height: window.innerHeight,
        videoId: videoId,
        playerVars: {
          controls: controls,
          enablejsapi: 1,
          playsinline: 1,
          disablekb: 1,
          rel: 0,
          fs: 0,
          modestbranding: 1,
        },
        events: {
          onReady: function (event) {
            resolve()
          },
          onError: function (err) {
            console.log('on error', err)
          },
          onStateChange: function (event) {
            const status = event.data

            if (autoAdvance && status === YT.PlayerState.ENDED) {
              const count = scrollStory.getItems().length
              const next = id + 1

              if (next < count) {
                scrollStory.index(next)
              }
            }
          },
        },
      })
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
