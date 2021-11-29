const $ = require('jquery')
const story = require('./story')

require('../css/blueimp-gallery.css')
require('../css/blueimp-gallery-indicator.css')
require('../css/style.scss')
require('scrollstory/jquery.scrollstory.js')
require('stickybits/src/jquery.stickybits')
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
