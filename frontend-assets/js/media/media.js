const FADE_DURATION = 20

function fadeout(media, data) {
  return new Promise(function (resolve, reject) {
    $(media).animate(
      { volume: 0 },
      {
        duration: FADE_DURATION,
        always: function () {
          if (data.paused || (!data.active && !data.paused)) {
            media.pause()
          }
          resolve()
        },
      }
    )
  })
}

function fadein(media) {
  media.volume = 0
  const playPromise = media.play()

  playPromise.then(function () {
    return new Promise(function (resolve, reject) {
      $(media).animate(
        { volume: 1 },
        {
          duration: FADE_DURATION,
          always: function () {
            resolve()
          },
        }
      )
    })
  })

  return playPromise
}

function canPlayThroughPromise(media, srcs) {
  return new Promise(function (resolve, reject) {
    function canPlayThrough() {
      media.removeEventListener('canplaythrough', canPlayThrough)
      media.removeEventListener('loadeddata', loadedMetaData)
      resolve()
    }

    function loadedMetaData() {
      // media is in browser cache
      if (media.readyState > 3) {
        media.removeEventListener('canplaythrough', canPlayThrough)
        media.removeEventListener('loadeddata', loadedMetaData)
        resolve()
      }
    }

    media.addEventListener('canplaythrough', canPlayThrough)
    media.addEventListener('loadeddata', loadedMetaData)

    media.onerror = function (e) {
      media.onerror = null
      resolve()
    }

    srcs.forEach((src, i) => {
      const source = document.createElement('source')
      source.type = src.type
      source.src = src.src
      media.appendChild(source)

      // resolve if error on sources (404)
      if (i === srcs.length - 1) {
        source.addEventListener('error', function (e) {
          resolve()
        })
      }
    })

    // resolve incase of invalid sources.
    if (!srcs.length) {
      resolve()
    }
  })
}

function addAutoAdvance(media, story, itemId, once) {
  const count = story.getItems().length
  const next = itemId + 1

  function advanceMedia() {
    if (next < count) {
      story.index(next)
    } else {
      story.index(0)
    }
  }

  if (once) {
    // auto advance on media end
    media.addEventListener('ended', function () {
      // Allow it to restart from the beginning.
      media.currentTime = 0
      advanceMedia()
    })
  }
  // loop within timer
  else {
    return advanceMedia
  }
}

module.exports = {
  addAutoAdvance,
  canPlayThroughPromise,
  fadeout,
  fadein,
}
