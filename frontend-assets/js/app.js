require('../css/blueimp-gallery.css')
require('../css/blueimp-gallery-indicator.css')
require('../css/style.scss')

const story = require('./story')
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
    story.loadExclusives()
  }
})

story.init().then(() => {
  let overlay = document.getElementById('loading_overlay')
  let playStart = document.getElementById('play_start')
  playStart.style.display = 'block'

  playStart.addEventListener('click', () => {
    // load a media element within scope of the user gesture to make sure Safari works.
    // NOTE THIS HAS TO STAY IN SCOPE OF THE USER GESTURE i.e. closure of event.
    if (story.scrollStory.MURAL_MEDIA.length) {
      story.scrollStory.MURAL_MEDIA[
        story.scrollStory.MURAL_MEDIA.length - 1
      ].load()
    }
    document.body.removeChild(overlay)
    document.body.classList.remove('frozen')
    $('#paywall').addClass('exclusive')
    overlay = null
    playStart = null
    story.load()
  })
})
