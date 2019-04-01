// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var youtube_id = 'ytplayer_'+youtubeSource.src;
video.id = youtube_id;

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
canPlayThrough = new Promise(function(resolve, reject) {
  window.onYouTubePlayerAPIReady = function () {
    player = new YT.Player(youtube_id, {
      width: window.innerWidth,
      height: window.innerHeight,
      videoId: youtubeSource.src,
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
          MEDIA[id] = event.target;
          resolve();
        },
        // 'onStateChange': onPlayerStateChange
      }
    });
  }
});