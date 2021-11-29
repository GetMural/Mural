const YOUTUBE = {}
let loaded = false

function loadYouTube() {
  if (!loaded) {
    const tag = document.createElement('script')
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
  console.log('set muted', YOUTUBE)
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
  const youtube_id = getYoutubeId(item)
  const player = YOUTUBE[youtube_id]

  if (!player) {
    return
  }

  if (isSoundEnabled) {
    player.unMute()
  } else {
    player.mute()
  }
  player.playVideo()
}

function remove(item) {
  const youtube_id = getYoutubeId(item)
  const $container = item.el.find('.video-container')
  $container.css('position', '')
  YOUTUBE[youtube_id].pauseVideo()
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
  const controls = item.data.hasOwnProperty('controls') ? 1 : 0

  const canPlayThrough = new Promise(function (resolve, reject) {
    YouTubePromise.then(function () {
      console.log('yt laoding?', youtube_id)
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
            console.log('on ready', event)
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

  return canPlayThrough
}

module.exports = {
  play,
  remove,
  stick,
  prepare,
  setMuted,
}
