const YOUTUBE = {};
let loaded = false;

function loadYouTube () {
  if (!loaded) {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/player_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    loaded = true;
  }
}

const YouTubePromise = new Promise(function(resolve, reject) {
  window.onYouTubePlayerAPIReady = function () {
    resolve();
  }
});

function resizePlayers() {
  Object.keys(YOUTUBE).forEach(function (ytid) {
    YOUTUBE[ytid].setSize(window.innerWidth, window.innerHeight);
  });  
}

let resizeTimeout;
window.addEventListener('resize', function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resizePlayers, 200);
});

function getYoutubeId (item) {
  const videoId = item.data.youtubeId;
  const id = item.index;
  return `ytplayer_${videoId}_${id}`;
}

function setMuted (muted) {
  Object.keys(YOUTUBE).forEach(function (ytid) {
    const player = YOUTUBE[ytid];
    if (muted) {
      player.mute();
    } else {
      player.unMute();
    }
  });
}

function play(item, isSoundEnabled) {
  const youtube_id = getYoutubeId(item);
  const player = YOUTUBE[youtube_id]

  if (isSoundEnabled) {
    player.unMute();
  } else {
    player.mute();
  }
  player.playVideo();
}

function remove(item) {
  const youtube_id = getYoutubeId(item);
  const $container = item.el.find('.video-container');
  $container.css('position', '');
  YOUTUBE[youtube_id].pauseVideo();
}

function stick(item) {
  const $container = item.el.find('.video-container');
  $container.css('position', 'fixed');
}

function prepare(scrollStory, item) {
  loadYouTube();
  const videoId = item.data.youtubeId;
  const hasControls = item.data.controls;
  const autoAdvance = item.data.autoAdvance;
  const id = item.index;
  const youtube_id = getYoutubeId(item);

  const canPlayThrough = new Promise(function(resolve, reject) {
    YouTubePromise.then(function () {
      YOUTUBE[youtube_id] = new YT.Player(youtube_id, {
        width: window.innerWidth,
        height: window.innerHeight,
        videoId: videoId,
        playerVars: {
          controls: hasControls ? 1 : 0,
          enablejsapi: 1,
          playsinline: 1,
          disablekb: 1,
          rel: 0,
          fs: 0,
          modestbranding: 1,
        },
        events: {
          onReady: function (event) {
            resolve();
          },
          onStateChange: function (event) {
            const status = event.data;

            if (autoAdvance && (status === YT.PlayerState.ENDED)) {
              const count = scrollStory.getItems().length;
              const next = id + 1;

              if (next < count) {
                scrollStory.index(next);
              }
            }
          }
        }
      });
    });
  });

  return canPlayThrough;
}

module.exports = {
  play,
  remove,
  stick,
  prepare,
  setMuted,
};
