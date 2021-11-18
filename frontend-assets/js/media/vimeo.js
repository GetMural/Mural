const VIMEO = {}

function setMuted(muted) {
  console.log('set muted vimeo')

  for (const index of Object.keys(VIMEO)) {
    VIMEO[index].setVolume(muted ? 0 : 1)
  }
}

function play(item, isSoundEnabled) {
  console.log('play vimeo', VIMEO[item.index])
  VIMEO[item.index].play()
}

function remove(item) {
  console.log('remove vimeo')
  const $container = item.el.find('iframe')
  $container.css('position', '')
  VIMEO[item.index].pause()
}

function stick(item) {
  const $container = item.el.find('iframe')
  $container.css('position', 'fixed')
}

function prepare(scrollStory, item) {
  VIMEO[item.index] = new Vimeo.Player('vimeo_' + item.index)
  console.log('vimeo prepare', VIMEO)
}

module.exports = {
  play,
  remove,
  stick,
  prepare,
  setMuted,
}
