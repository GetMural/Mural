// Take the template from Mural 1 currently
function render({ controls, autoAdvance, youtubeId }, position) {
  return `<section class="st-video part"
  name="story${position}"

  ${youtubeId ? `data-youtube-id=${youtubeId}` : ''}
  ${autoAdvance ? `data-auto-advance="true"` : ''}
  ${controls ? `data-controls="true"` : ''}
>
  <div class="video-container">
    <div id="ytplayer_${youtubeId}_${position}"></div>
  </div>
</section>`;
}

module.exports = render;
