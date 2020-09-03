// Take the template from Mural 1 currently
const Datauri = require('datauri/sync');

function render(
  {
    title,
    body,
    video: { path, mimeType, dimensions },
    offset,
    useOffset,
    playback,
  },
  position,
) {
  const preview = mimeType ? Datauri(path).content : path;

  return `<section class="st-content-video part snap"
  name="story${position}"
  data-poster=""

  ${
    path
      ? `data-video="true" data-autoplay="true" data-muted="false" data-fullpage="true" data-mp4="${preview}"`
      : ''
  }
  ${playback === 'loop' ? `data-loop="true"` : ''}
  ${playback === 'autoAdvance' ? `data-auto-advance="true"` : ''}
>
  ${
    useOffset
      ? `<style>
  @media (orientation: portrait) {
    section[name="story${position}"] video { 
      position: absolute;
      top: 50%;
      left: ${offset}%;
      transform: translate(-${offset}%, -50%);
    } 
  }
</style>`
      : ''
  }

  <div class="video-container"></div>
  <div class="caption">
    <div class="button-container play"></div>
    <div class="button-container pause"></div>
    <div class="text">
    <h3>${title}</h3>
    ${body}
    </div>
  </div>
</section>`;
}

module.exports = render;
