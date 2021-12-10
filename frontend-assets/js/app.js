const $ = require('jquery')
const story = require('./story')

require('../css/blueimp-gallery.css')
require('../css/blueimp-gallery-indicator.css')
require('../css/style.scss')

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
    $('section, img').removeClass('exclusive')
    story.loadExclusives();
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
  $('#paywall').addClass('exclusive')
  overlay = null
  playStart = null
  story.load()
})

story.init()
