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

function prepare(scrollStory, item) {
  const videoId = item.data.youtubeId;
  const hasControls = item.data.controls;
  const autoAdvance = item.data.autoAdvance;
  const id = item.index;

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
          controls: hasControls ? 1 : 0,
          enablejsapi: 1,
          playsinline: 0,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: function (event) {
            YOUTUBE[videoId] = event.target;
            resolve();
          },
          // https://developers.google.com/youtube/iframe_api_reference#Example_Video_Player_Constructors
          onStateChange: function (event) {
            const status = event.data;

            if (autoAdvance && status === 0) {
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
  })
}

module.exports = {
  play,
  remove,
  stick,
  prepare,
};
