const $ = require('jquery')

require('../css/blueimp-gallery.css')
require('../css/blueimp-gallery-indicator.css')
require('../css/style.scss')
require('scrollstory/jquery.scrollstory.js')

const blueimp = require('blueimp-gallery/js/blueimp-gallery')
const videoMedia = require('./media/video')
const imageMedia = require('./media/images')
const audioMedia = require('./media/audio')
const youtubeMedia = require('./media/youtube')
const vimeoMedia = require('./media/vimeo')
const dailymotionMedia = require('./media/dailymotion')
const { default: stickybits } = require('stickybits')

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
      case 13: // Enter
        if (this.options.toggleControlsOnEnter) {
          this.preventDefault(event)
          this.toggleControls()
        }
        break
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
    }
  }
}

function prepMediaElements(scrollStory) {
  // need a central media registry for user gesture purposes.
  scrollStory.MURAL_AUDIO = []
  scrollStory.MURAL_VIDEO = []

  const items = scrollStory.getItems()
  items.forEach(function (item) {
    if (item.data.video) {
      scrollStory.MURAL_VIDEO[item.index] = document.createElement('video')
    }

    if (item.data.audio) {
      scrollStory.MURAL_AUDIO[item.index] = document.createElement('audio')
    }
  })
}

// let storyItems
let scrollStory
const LOAD_PROMISES = []
const LOADED_STORY_SECTIONS = []
let isSoundEnabled = true
let WINDOW_WIDTH
let scrKey
let attrKey

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

function setItemSticky(item) {
  if (item.data.video) {
    videoMedia.fixBackgroundVideo(item.el)
  }

  if (item.data.youtubeId) {
    youtubeMedia.stick(item)
  }

  if (item.data.vimeoVideoId) {
    vimeoMedia.stick(item)
  }

  if (item.data.dailymotionId) {
    dailymotionMedia.stick(item)
  }
}

function setItemStart(item) {
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

  // Stop previous & next item
  if (
    item.data.video ||
    item.data.youtubeId ||
    item.data.vimeoVideoId ||
    item.data.dailymotionId ||
    item.data.audio
  ) {
    if (item.index > 0) {
      setItemStop(storyItems[item.index - 1])
    }

    if (item.index < storyItems.length) {
      setItemStop(storyItems[item.index + 1])
    }
  }

  if (item.data.video) {
    videoMedia.playBackgroundVideo(item.index, getVideoAttrs(item))
  }

  if (item.data.youtubeId) {
    youtubeMedia.play(item, isSoundEnabled)
  }

  if (item.data.vimeoVideoId) {
    vimeoMedia.play(item, isSoundEnabled)
  }

  if (item.data.dailymotionId) {
    dailymotionMedia.play(item, isSoundEnabled)
  }

  if (item.data.audio) {
    audioMedia.playBackgroundAudio(item, {
      muted: !isSoundEnabled,
    })
  }
}

function setItemStop(item) {
  if (item.data.youtubeId) {
    youtubeMedia.remove(item)
  }

  if (item.data.vimeoVideoId) {
    vimeoMedia.remove(item)
  }

  if (item.data.dailymotionId) {
    dailymotionMedia.remove(item)
  }

  if (item.data.video) {
    videoMedia.removeBackgroundVideo(item.el, item.index)
  }

  if (item.data.audio) {
    audioMedia.removeBackgroundAudio(item.index)
  }
}

function onItemFocus(ev, item) {
  setItemSticky(item)
}

function onItemExitViewport(ev, item) {
  setItemStop(item)
}
function onItemBlur(ev, item) {}

function onItemEnterViewport(ev, item) {
  setItemStart(item)
}

function init() {
  WINDOW_WIDTH = $(window).width()
  const $story = $('#scrollytelling')

  scrollStory = $story
    .scrollStory({
      contentSelector: '.part',
      triggerOffset: 0,
    })
    .data('plugin_scrollStory')

  prepMediaElements(scrollStory)

  const storyItems = scrollStory.getItems()

  // $story.on('itemexitviewport', onItemExitViewport)
  // $story.on('itementerviewport', onItemEnterViewport)
  // $story.on('itemfocus', onItemFocus)
  // $story.on('itemblur', onItemBlur)

  // parallax.
  $('[data-scroll-speed]').moveIt()

  $('.mute').click(function () {
    const $this = $(this)
    if ($this.hasClass('muted')) {
      isSoundEnabled = true
      $this.removeClass('muted')
    } else {
      isSoundEnabled = false
      $this.addClass('muted')
    }

    storyItems.forEach(function (item) {
      if (item.data.video) {
        const muted = !isSoundEnabled || item.data.muted
        videoMedia.setMuted(item.index, muted)
      }

      if (item.data.audio) {
        const muted = !isSoundEnabled
        audioMedia.setMuted(item.index, muted)
      }
    })

    youtubeMedia.setMuted(!isSoundEnabled)
    vimeoMedia.setMuted(!isSoundEnabled)
    dailymotionMedia.setMuted(!isSoundEnabled)
  })

  $('.sticks_wrapper').click(function () {
    $('body').toggleClass('paneOpen')
  })

  $('nav').on('click', 'li', function () {
    scrollStory.index(parseInt(this.dataset.index, 10))
  })

  const active = scrollStory.getActiveItem()

  scrollStory.getItemsInViewport().forEach(function (item) {
    const loadPromise = loadItem(item)

    if (loadPromise) {
      LOAD_PROMISES.push(loadPromise)
    }
  })

  // push two in advance
  if (active && active.index + 1 < storyItems.length) {
    const loadPromise = loadItem(storyItems[active.index + 1])

    if (loadPromise) {
      LOAD_PROMISES.push(loadPromise)
    }
  }

  // push two in advance
  if (active && active.index + 2 < storyItems.length) {
    const loadPromise = loadItem(storyItems[active.index + 2])

    if (loadPromise) {
      LOAD_PROMISES.push(loadPromise)
    }
  }

  Promise.all(LOAD_PROMISES)
}

function load() {
  const $story = $('#scrollytelling')

  $story.on('itemexitviewport', onItemExitViewport)
  $story.on('itementerviewport', onItemEnterViewport)
  $story.on('itemfocus', onItemFocus)
  $story.on('itemblur', onItemBlur)

  const active = scrollStory.getActiveItem()

  const MURAL_MEDIA = scrollStory.MURAL_AUDIO.concat(scrollStory.MURAL_VIDEO)
  // load a media element within scope of the user gesture to make sure Safari works.
  if (MURAL_MEDIA.length) {
    MURAL_MEDIA[MURAL_MEDIA.length - 1].load()
  }

  if (active.data.video) {
    videoMedia.playBackgroundVideo(active.index, getVideoAttrs(active))
    videoMedia.fixBackgroundVideo(active.el)
  }

  if (active.data.audio) {
    audioMedia.playBackgroundAudio(active, {
      muted: !isSoundEnabled,
    })
  }

  if (active.data.youtubeId) {
    youtubeMedia.play(active, isSoundEnabled)
    youtubeMedia.stick(active)
  }
}

function loadExclusives() {
  const storyItems = scrollStory.getItems()
  const active = scrollStory.getActiveItem()

  // Start first item
  if (active) {
    loadItem(storyItems[active.index]).then(() => {
      setItemStart(active)
    })
  }
}

function getVideoAttrs(item) {
  const muted = !isSoundEnabled

  return {
    poster: item.data.poster,
    autoplay: true,
    muted: muted,
    loop: item.data.loop,
    autoAdvance: item.data.autoAdvance,
  }
}

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
    item.el.find('.bg-image').each(function (i) {
      const $el = $(this)
      const src = $el.data(scrKey)

      const loadPromise = imageMedia.imageLoadPromise(src).then(() => {
        $el.css('background-image', `url(${src})`)
      })

      returnPromises.push(loadPromise)
    })

    stickybits('.bg-image')
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
      getVideoAttrs(item)
    )

    returnPromises.push(videoLoaded)
  }

  if (item.data.audio) {
    const audioLoaded = audioMedia.prepareAudio(
      scrollStory,
      item.el,
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
}
