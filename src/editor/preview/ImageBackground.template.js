// Take the template from Mural 1 currently

function render(
  {
    id,
    title,
    subtitle,
    body,
    image: { renditions },
    audio: { preview, mimeType },
    isFullPage,
  },
  position,
) {
  return `<section class="part sticky-image" name="story${position}"
  ${preview ? 'data-audio=true' : ''}
  ${mimeType === 'audio/mp3' ? `data-mp3="${preview}"` : ''}
  ${mimeType === 'audio/ogg' ? `data-ogg="${preview}"` : ''}

  ${
    renditions
      ? `data-image=true data-src="${renditions[8].thumborUrl}" data-src-medium="${renditions[4].thumborUrl}" data-src-phone="${renditions[2].thumborUrl}"`
      : ''
  }
  >
  ${renditions ? '<div class="bg-image"></div>' : ''}
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
