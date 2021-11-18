function setMuted(muted) {
  console.log('set muted vimeo')
}

function play(item, isSoundEnabled) {
  console.log('play vimeo')
}

function remove(item) {
  console.log('remove vimeo')
}

function stick(item) {
  console.log('stick vimeo')
}

function prepare(scrollStory, item) {
  const player = new Vimeo.Player('vimeo_' + item.index, {
    width: window.innerWidth,
    height: window.innerHeight,
  })
  console.log('vimeo prepare', player)
}

module.exports = {
  play,
  remove,
  stick,
  prepare,
  setMuted,
}
