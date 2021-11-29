const $ = require('jquery')
const story = require('./story')

require('../css/blueimp-gallery.css')
require('../css/blueimp-gallery-indicator.css')
require('../css/style.scss')
require('scrollstory/jquery.scrollstory.js')
require('stickybits/src/jquery.stickybits')

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

const blueimp = require('blueimp-gallery/js/blueimp-gallery')
require('blueimp-gallery/js/blueimp-gallery-indicator')

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

const form = $('#bypass')

// original code courtesy of CodeNiro
// http://codeniro.com/caesars-cipher-algorithm-javascript/

function encrypt(text, shift) {
  var result = ''
  for (var i = 0; i < text.length; i++) {
    var c = text.charCodeAt(i)
    if (c >= 65 && c <= 90) {
      result += String.fromCharCode(((c - 65 + shift) % 26) + 65)
    } else if (c >= 97 && c <= 122) {
      result += String.fromCharCode(((c - 97 + shift) % 26) + 97)
    } else {
      result += text.charAt(i)
    }
  }
  return result
}

const bypass = $('meta[name=bypass]').attr('content')
const rot = Number($('meta[name=rot]').attr('content'))

form.find('button').on('click', function (event) {
  event.preventDefault()
  const value = form.find('input')[0].value
  if (encrypt(value, rot) === bypass) {
    console.log(`${value} matches ${bypass}`)
    $('.exclusive').removeClass('exclusive')
    $('#paywallInfo').removeClass('paywallInfo')
    story.loadExclusives()
  } else {
    console.log(
      `${value} does not match ${bypass} with rotational value ${rot}`
    )
  }
})

let overlay = document.getElementById('loading_overlay')
let playStart = document.getElementById('play_start')
playStart.style.display = 'block'

playStart.addEventListener('click', () => {
  document.body.removeChild(overlay)
  document.body.classList.remove('frozen')

  overlay = null
  playStart = null
})

story.init()
