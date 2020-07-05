// Take the template from Mural 1 currently

function render({ slides }, position) {
  return `<section class="part slideshow-horizontal snap" name="story${position}" data-slideshow=true>
  <div class="blueimp-gallery blueimp-gallery-carousel blueimp-gallery-controls">
    <div class="slides"></div>
    <a class="prev">&lsaquo;</a>
    <a class="next">&rsaquo;</a>
    <div class="slide-caption"></div>
    <div class="credits"></div>
  </div>

  <div class='slide-container'>
    ${slides.map(
      ({ alt, credits, title, renditions, id }) =>
        `<a
        ${`data-src="${renditions[8].thumborUrl}" data-src-medium="${renditions[4].thumborUrl}" data-src-phone="${renditions[2].thumborUrl}"`}
        title="${title}"
        alt="${alt}"
        data-credits="${credits}"
      >${title}</a>`,
    )}}
  </div>
</section>`;
}

module.exports = render;
