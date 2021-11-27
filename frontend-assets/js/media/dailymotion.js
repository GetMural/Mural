const DAILYMOTION = {}

function setMuted(muted) {
  for (const index of Object.keys(DAILYMOTION)) {
    DAILYMOTION[index].setMuted(muted)
  }
}

function play(item, isSoundEnabled) {
  DAILYMOTION[item.index].play()
}

function remove(item) {
  const $container = item.el.find('.video-container')
  $container.css('position', '')
  DAILYMOTION[item.index].pause()
}

function stick(item) {
  const $container = item.el.find('.video-container')
  $container.css('position', 'fixed')
}

function prepare(scrollStory, item) {
  DAILYMOTION[item.index] = DM.player(
    document.getElementById('dm_' + item.index),
    {
      video: item.data.dailymotionId,
      width: '100%',
      height: '100%',
      params: {
        controls: item.data.hasOwnProperty('controls'),
        autoplay: false,
        mute: false,
      },
    }
  )
}

module.exports = {
  play,
  remove,
  stick,
  prepare,
  setMuted,
}
