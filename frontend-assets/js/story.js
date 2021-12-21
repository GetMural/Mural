const blueimp = require('blueimp-gallery/js/blueimp-gallery')
const videoMedia = require('./media/video')
const imageMedia = require('./media/images')
const audioMedia = require('./media/audio')
const youtubeMedia = require('./media/youtube')
const vimeoMedia = require('./media/vimeo')
const dailymotionMedia = require('./media/dailymotion')

$.fn.moveIt = function () {
  var $window = $(window)
  var instances = []

  $(this).each(function () {
    instances.push(new MoveItItem($(this)))
  })

  window.addEventListener(
    'scroll',
    function (e) {
      const scrollTop = $window.scrollTop()
      instances.forEach(function (inst) {
        inst.update(scrollTop)
      })
    },
    { passive: true }
  ) // TODO check compatibility
}

const MoveItItem = function (el) {
  this.el = $(el)
  this.container = this.el.parent('.part')
  this.speed = parseInt(this.el.attr('data-scroll-speed'))
  // 60 fps
  this.fpsInterval = 1000 / 60
  this.top = null
  this.inView = false
  this.rafID = null
  this.then = null
}

MoveItItem.prototype.animate = function (time) {
  // calc elapsed time since last loop
  const now = time
  const elapsed = now - this.then

  // if enough time has elapsed, draw the next frame
  if (elapsed > this.fpsInterval) {
    // Get ready for next frame by setting then=now, but...
    // Also, adjust for fpsInterval not being multiple of 16.67
    this.then = now - (elapsed % this.fpsInterval)
    this.el.css('transform', 'translateY(' + -(this.top / this.speed) + 'px)')
  }
  this.rafID = requestAnimationFrame(this.animate.bind(this))
}

MoveItItem.prototype.update = function (scrollTop) {
  if (this.container.hasClass('inviewport')) {
    if (!this.inView) {
      this.el.css('willChange', 'transform')
      this.then = performance.now()
      this.rafID = requestAnimationFrame(this.animate.bind(this))
    }

    this.top = scrollTop - this.container.offset().top
    this.inView = true
  } else {
    if (this.inView) {
      cancelAnimationFrame(this.rafID)
      this.el.css('willChange', 'auto')
    }
    this.inView = false
  }
}

// Override this function so we can change the arrow keys.
blueimp.prototype.onkeydown = function (event) {
  if (this.options.storyItem.active) {
    switch (event.which || event.keyCode) {
      case 38: // ArrowUp
        if (this.options.enableKeyboardNavigation) {
          this.preventDefault(event)
          this.prev()
        }
        break
      case 40: // ArrowDown
        if (this.options.enableKeyboardNavigation) {
          this.preventDefault(event)
          this.next()
        }
        break
      default:
        // Enter
        if (this.options.toggleControlsOnEnter) {
          this.preventDefault(event)
          this.toggleControls()
        }
    }
  }
}

// let storyItems
let scrollStory
const LOAD_PROMISES = []
const LOADED_STORY_SECTIONS = []
let isSoundEnabled = true
let WINDOW_WIDTH
let scrKey
let attrKey

const $story = $('#scrollytelling')

scrollStory = $story
  .scrollStory({
    contentSelector: '.part',
    triggerOffset: 0,
    index: 0,
  })
  .data('plugin_scrollStory')

if (WINDOW_WIDTH >= 1024) {
  scrKey = 'src'
  attrKey = 'src'
} else if (WINDOW_WIDTH >= 600) {
  scrKey = 'srcMedium'
  attrKey = 'src-medium'
} else {
  scrKey = 'srcPhone'
  attrKey = 'src-phone'
}

let storyContent = scrollStory.getItems()
let paywall = storyContent.filter((item) => item.id === 'paywallInfo')[0]

function prepMediaElements() {
  // need a central media registry for user gesture purposes.
  scrollStory.MURAL_AUDIO = []
  scrollStory.MURAL_VIDEO = []

  storyContent.forEach(function (item) {
    if (item.data.video) {
      const video = document.createElement('video')
      video.muted = !!item.data.muted
      video.loop = !!item.data.loop
      video.dataset.id = item.index
      scrollStory.MURAL_VIDEO[item.index] = video
    }

    if (item.data.audio) {
      const audio = document.createElement('audio')
      audio.muted = item.data.muted
      audio.dataset.id = item.index
      scrollStory.MURAL_AUDIO[item.index] = audio
    }
  })

  scrollStory.MURAL_MEDIA = scrollStory.MURAL_AUDIO.concat(
    scrollStory.MURAL_VIDEO
  ).filter((media) => media)
}

function setItemFocus(item) {
  if (item.data.video) {
    videoMedia.fixBackgroundVideo(item.el)
    videoMedia.playBackgroundVideo(scrollStory, item)
  }

  if (item.data.youtubeId) {
    youtubeMedia.play(item, isSoundEnabled)
    youtubeMedia.stick(item)
  }

  if (item.data.vimeoVideoId) {
    vimeoMedia.play(item, isSoundEnabled)
    vimeoMedia.stick(item)
  }

  if (item.data.dailymotionId) {
    dailymotionMedia.play(item, isSoundEnabled)
    dailymotionMedia.stick(item)
  }

  if (item.data.audio) {
    audioMedia.playBackgroundAudio(scrollStory, item)
  }
}

function setItemEnter(item) {
  const storyItems = scrollStory.getItems()
  loadItem(item)

  // load another in advance
  if (item.index + 1 < storyItems.length) {
    loadItem(storyItems[item.index + 1])
  }

  // load another in advance
  if (item.index + 2 < storyItems.length) {
    loadItem(storyItems[item.index + 2])
  }
}

function setItemStop(item) {
  if (item.data && item.data.youtubeId) {
    youtubeMedia.remove(item)
  }

  if (item.data && item.data.vimeoVideoId) {
    vimeoMedia.remove(item)
  }

  if (item.data && item.data.dailymotionId) {
    dailymotionMedia.remove(item)
  }

  if (item.data && item.data.video) {
    videoMedia.removeBackgroundVideo(scrollStory, item)
  }

  if (item.data && item.data.audio) {
    audioMedia.removeBackgroundAudio(scrollStory, item.index)
  }
}

function onItemFocus(ev, item) {
  setItemFocus(item)
}

function onItemBlur(ev, item) {
  setItemStop(item)
}

function onItemEnterViewport(ev, item) {
  setItemEnter(item)
}

function init() {
  WINDOW_WIDTH = $(window).width()

  prepMediaElements()

  // parallax.
  $('[data-scroll-speed]').moveIt()

  $('.mute').on('click', function () {
    const $this = $(this)
    if ($this.hasClass('muted')) {
      isSoundEnabled = true
      $this.removeClass('muted')
    } else {
      isSoundEnabled = false
      $this.addClass('muted')
    }

    scrollStory.MURAL_MEDIA.forEach(function (media) {
      media.muted = !isSoundEnabled
    })

    youtubeMedia.setMuted(!isSoundEnabled)
    vimeoMedia.setMuted(!isSoundEnabled)
    dailymotionMedia.setMuted(!isSoundEnabled)
  })

  $('.sticks_wrapper').on('click', function () {
    $('body').toggleClass('paneOpen')
  })

  $('nav').on('click', 'li', function () {
    const itemId = parseInt(this.dataset.index, 10)
    const quarantined = paywall && !paywall.filtered && itemId >= paywall.index

    if (quarantined) {
      scrollStory.index(paywall.index)
    } else {
      scrollStory.index(itemId)
    }
  })

  const active = scrollStory.getActiveItem()

  scrollStory.getItemsInViewport().forEach(function (item) {
    const loadPromise = loadItem(item)

    if (loadPromise) {
      LOAD_PROMISES.push(loadPromise)
    }
  })

  // push two in advance
  if (active && active.index + 1 < storyContent.length) {
    const loadPromise = loadItem(storyContent[active.index + 1])

    if (loadPromise) {
      LOAD_PROMISES.push(loadPromise)
    }
  }

  // push two in advance
  if (active && active.index + 2 < storyContent.length) {
    const loadPromise = loadItem(storyContent[active.index + 2])

    if (loadPromise) {
      LOAD_PROMISES.push(loadPromise)
    }
  }

  return Promise.all(LOAD_PROMISES)
}

function load() {
  $story.on('itemfocus', onItemFocus)
  $story.on('itementerviewport', onItemEnterViewport)
  $story.on('itemblur', onItemBlur)

  const active = scrollStory.getActiveItem()
  setItemFocus(active)
}

function loadExclusives() {
  scrollStory.filter(storyContent[paywall.index])

  $('section').removeClass('exclusive')
  scrollStory.updateOffsets()
}
window.loadExclusives = loadExclusives

function loadItem(item) {
  if (LOADED_STORY_SECTIONS[item.index] !== undefined) {
    return
  } else {
    LOADED_STORY_SECTIONS[item.index] = {
      loaded: true,
    }
  }

  const returnPromises = []

  if (item.data.youtubeId) {
    const youtubeLoaded = youtubeMedia.prepare(scrollStory, item)
    returnPromises.push(youtubeLoaded)
  }

  if (item.data.vimeoVideoId) {
    const vimeoLoaded = vimeoMedia.prepare(scrollStory, item)
    returnPromises.push(vimeoLoaded)
  }

  if (item.data.dailymotionId) {
    const dailymotionLoaded = dailymotionMedia.prepare(scrollStory, item)
    returnPromises.push(dailymotionLoaded)
  }

  if (item.data.image) {
    const imageLoaded = imageMedia
      .insertBackgroundImage(item.el, item.data[scrKey])
      .then((shouldUpdateOffsets) => {
        if (shouldUpdateOffsets) {
          scrollStory.updateOffsets()
        }
      })
    returnPromises.push(imageLoaded)
  }

  if (item.data.slideshow) {
    const slides = item.el.find('.slide-container a').get()
    const slidePromises = []

    for (let i = 0; i < slides.length; i++) {
      const a = slides[i]
      const src = $(a).data(scrKey)
      const loadPromise = imageMedia.imageLoadPromise(src)
      slidePromises.push(loadPromise)
    }

    const horizontalSlidePromise = Promise.all(slidePromises).then(() => {
      blueimp(slides, {
        container: item.el.find('.blueimp-gallery')[0],
        urlProperty: attrKey,
        carousel: true,
        startSlideshow: false,
        thumbnailIndicators: true,
        enableKeyboardNavigation: true,
        toggleControlsOnEnter: false,
        storyItem: item, // use this in our custom keydown mod.
        onslide: function (index, slide) {
          const info = [
            { selector: '.slide-caption', attr: 'title' },
            { selector: '.credits', attr: 'data-credits' },
          ]

          info.forEach(({ selector, attr }) => {
            const text = this.list[index].getAttribute(attr)
            const $node = $(this.container).parent().find(selector)
            $node.empty()
            if (text) {
              $node[0].innerHTML = text
            }
          })
        },
      })
    })
    returnPromises.push(horizontalSlidePromise)
  }

  if (item.data.slides) {
    item.el
      .find('.bg-image')
      .each(function (i) {
        const $el = $(this)
        const src = $el.data(scrKey)

        const loadPromise = imageMedia.imageLoadPromise(src).then(() => {
          $el.css('background-image', `url(${src})`)
        })

        returnPromises.push(loadPromise)
      })
      .stickybits()
  }

  if (item.data.parallax) {
    const src = item.data[scrKey]
    const loadPromise = imageMedia.imageLoadPromise(src).then(() => {
      item.el.find('.bg-image').css('background-image', `url(${src})`)
    })

    returnPromises.push(loadPromise)
  }

  if (item.data.video) {
    const videoLoaded = videoMedia.prepareVideo(
      scrollStory,
      item.el,
      item.index,
      [
        {
          type: 'video/mp4',
          src: item.data.mp4,
        },
        {
          type: 'video/webm',
          src: item.data.webm,
        },
        {
          type: 'application/vnd.apple.mpegurl',
          src: item.data.hls,
        },
      ],
      videoMedia.getVideoAttrs(item)
    )

    returnPromises.push(videoLoaded)
  }

  if (item.data.audio) {
    const audioLoaded = audioMedia.prepareAudio(
      scrollStory,
      item.index,
      [
        {
          type: 'audio/mp3',
          src: item.data.mp3,
        },
        {
          type: 'audio/ogg',
          src: item.data.ogg,
        },
      ],
      { loop: item.data.loop }
    )

    returnPromises.push(audioLoaded)
  }

  return Promise.all(returnPromises)
}

module.exports = {
  init: init,
  loadExclusives: loadExclusives,
  load: load,
  scrollStory: scrollStory,
}
