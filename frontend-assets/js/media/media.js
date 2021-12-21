const FADE_DURATION = 20

function fadeout(media, shouldPause) {
  return Promise.resolve().then(function () {
    return $(media)
      .animate(
        { volume: 0 },
        {
          duration: FADE_DURATION,
          always: function () {
            if (shouldPause() && !media.paused) {
              console.log('pausing media')
              console.log(media)
              media.pause()
            }
          },
        }
      )
      .promise()
  })
}

function fadein(media) {
  media.volume = 0
  const playPromise = media.play()

  playPromise.then(function () {
    return $(media)
      .animate(
        { volume: 1 },
        {
          duration: FADE_DURATION,
          always: function () {
            console.log('playing media')
            console.log(media)
          },
        }
      )
      .promise()
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

module.exports = {
  canPlayThroughPromise,
  fadeout,
  fadein,
}
