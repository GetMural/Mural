const YouTubePromise = new Promise(function(resolve, reject) {
  window.onYouTubePlayerAPIReady = function () {
    resolve();
  }
});
loadYouTube();

const YOUTUBE = [];

function loadYouTube () {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function getYoutubeId (item) {
  const videoId = item.data.youtubeId;
  const id = item.index;
  return `ytplayer_${videoId}_${id}`;
}

function play(item) {
  const youtube_id = getYoutubeId(item);
  YOUTUBE[youtube_id].playVideo();
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
          playsinline: 0,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: function (event) {
            resolve();
          },
          // https://developers.google.com/youtube/iframe_api_reference#Example_Video_Player_Constructors
          onStateChange: function (event) {
            const status = event.data;

            if (autoAdvance && status === 0) {
              debugger;
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
};
