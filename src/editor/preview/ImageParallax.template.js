// Take the template from Mural 1 currently

function render(
  { title, subtitle, image: { renditions } },
  position,
) {
  return `<section class="part parallax" name="story${position}" data-parallax=true
    ${
      renditions
        ? `data-src="${renditions[8].thumborUrl}" data-src-medium="${renditions[4].thumborUrl}" data-src-phone="${renditions[2].thumborUrl}"`
        : ''
    }
    >
    ${
      renditions
        ? '<div class="bg-image" data-scroll-speed="-2"></div>'
        : ''
    }
    <div class="content container">
        <div class="row">
            <div class="col-sm-12 header-fullpage">
            ${title ? `<h1>${title}</h1>` : ''}
            ${subtitle ? `<h2>${subtitle}</h2>` : ''}
            </div>
        </div>
    </div>
</section>`;
}

module.exports = render;
