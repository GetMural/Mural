let YouTubeLoaded = false;
let YouTubePromise;

const YOUTUBE = [];

function loadYouTube () {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function play(item) {
  const videoId = item.data.youtubeId;
  YOUTUBE[videoId].playVideo();
}

function remove(item) {
  const videoId = item.data.youtubeId;
  const $container = item.el.find('.video-container');
  $container.css('position', '');
  YOUTUBE[videoId].pauseVideo();
}

function stick(item) {
  const $container = item.el.find('.video-container');
  $container.css('position', 'fixed');
}

function prepare(item) {
  const videoId = item.data.youtubeId

  if (!YouTubeLoaded) {
    YouTubePromise = new Promise(function(resolve, reject) {
      window.onYouTubePlayerAPIReady = function () {
        resolve();
      }
    });

    loadYouTube();
    YouTubeLoaded = true;
  }

  YouTubePromise.then(function () {
    const canPlayThrough = new Promise(function(resolve, reject) {
      const player = new YT.Player('ytplayer_'+videoId, {
        width: window.innerWidth,
        height: window.innerHeight,
        videoId: videoId,
        playerVars: {
          controls: 0,
          enablejsapi: 1,
          playsinline: 0,
          rel: 0,
          loop: 1,
          modestbranding: 1,
        },
        events: {
          onReady: function (event) {
            YOUTUBE[videoId] = event.target;
            resolve();
          },
          // 'onStateChange': onPlayerStateChange
        }
      });
    });
  })
}

module.exports = {
  play,
  remove,
  stick,
  prepare,
};
