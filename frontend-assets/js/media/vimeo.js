const VIMEO = {}

function setMuted(muted) {
  for (const index of Object.keys(VIMEO)) {
    VIMEO[index].setVolume(muted ? 0 : 1)
  }
}

function play(item, isSoundEnabled) {
  VIMEO[item.index].play()
}

function remove(item) {
  const $container = item.el.find('.video-container')
  $container.css('position', '')
  VIMEO[item.index].pause()
}

function stick(item) {
  const $container = item.el.find('.video-container')
  $container.css('position', 'fixed')
}

function prepare(scrollStory, item) {
  VIMEO[item.index] = new Vimeo.Player('vimeo_' + item.index, {
    id: item.data.vimeoVideoId,
    responsive: true,
    autoplay: false,
    controls: item.data.hasOwnProperty('controls'),
  })
}

module.exports = {
  play,
  remove,
  stick,
  prepare,
  setMuted,
}
