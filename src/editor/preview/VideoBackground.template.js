// Take the template from Mural 1 currently
const Datauri = require('datauri/sync');

function render(
  {
    title,
    subtitle,
    body,
    video: { path, mimeType },
    align,
    offset,
    useOffset,
    isFullPage,
  },
  position,
) {
  const alignClass = {
    left: 'offset-left',
    center: 'offset-centre',
    right: 'offset-right',
  };

  const meta = Datauri(path);

  return `<section class="st-video part"
  name="story${position}"
  data-poster=""

  ${
    path
      ? 'data-video=true data-loop=true data-autoplay-true data-muted=false'
      : ''
  }

  ${mimeType === 'video/mp4' ? `data-mp4="${meta.content}"` : ''}
  ${mimeType === 'video/webm' ? `data-webm="${meta.content}"` : ''}
>
  ${
    useOffset
      ? `<style>
  @media (orientation:portrait) {
    section[name="story${position}"] .video-container {
      margin-left: ${offset}vw;
    }
  }
</style>`
      : ''
  }

  <div class="video-container ${alignClass[align]}">
  </div>
  <div class="content container-fluid">
    <div class="row">
      <div class="col-sm-12 ${isFullPage ? 'header-fullpage' : ''}">
        <div class="middle">
        ${title ? `<h1>${title}</h1>` : ''}
        ${subtitle ? `<h2>${subtitle}</h2>` : ''}
        </div>
      </div>
    </div>
    ${
      body
        ? `<div class="row">
      <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6 text">
          ${body}
      </div>
      </div>`
        : ''
    }

  </div>
</section>`;
}

module.exports = render;
