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
  const meta = Datauri(path);

  return `<section class="st-content-video part snap"
  name="story${position}"
  data-poster=""

  ${
    path
      ? `data-video="true" data-autoplay="true" data-muted="false" data-fullpage="true"`
      : ''
  }
  ${playback === 'loop' ? `data-loop="true"` : ''}
  ${playback === 'autoAdvance' ? `data-auto-advance="true"` : ''}

  ${mimeType === 'video/mp4' ? `data-mp4="${meta.content}"` : ''}
  ${mimeType === 'video/webm' ? `data-webm="${meta.content}"` : ''}
>
  ${
    useOffset
      ? `<style>
  @media (orientation:portrait) {
    section[name="story${position}"] .video-container { 
      margin-left: calc(calc((100% / ${dimensions.h}) * ${dimensions.w}) - 100%) * -${offset}/100)
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
