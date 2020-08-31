/* eslint-env browser */
/* globals $ YT */

let $story;
let ytPlayer;

function loadYouTube() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/player_api';
  document.body.appendChild(tag);
}

function loadItem(item) {
  const controls = item.el.get(0).dataset.controls;
  const videoId = item.el.get(0).dataset.youtubeId;

  console.log(controls);
  console.log(videoId);

  YouTubePromise.then(function() {
    ytPlayer = new YT.Player('ytPlayer', {
      width: window.innerWidth,
      height: window.innerHeight,
      videoId,
      playerVars: {
        controls: controls === 'true' ? 1 : 0,
        enablejsapi: 1,
        playsinline: 1,
        disablekb: 1,
        rel: 0,
        fs: 0,
        modestbranding: 1,
      },
      events: {
        onReady(e) {
          ytPlayer.playVideo();
        },
      },
    });
  });
}

const YouTubePromise = new Promise(function(resolve) {
  window.onYouTubePlayerAPIReady = function() {
    resolve();
  };
});

// code needed to bootstrap editor preview
$(document).ready(function() {
  loadYouTube();
  $story = $('#scrollytelling');

  $story
    .scrollStory({
      contentSelector: '.part',
      triggerOffset: 0,
      autoActivateFirstItem: true,
      containeractive: function() {
        const item = this.getActiveItem();
        loadItem(item);
      },
    })
    .data('plugin_scrollStory');
});

// code needed to refresh editor preview
window.refresh = function() {
  ytPlayer.stopVideo();
  ytPlayer.destroy();
  const item = $story.data('plugin_scrollStory').getActiveItem();
  loadItem(item);
};
