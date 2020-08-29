// Take the template from Mural 1 currently

function render({ slides }, position) {
  return `<section class="part slideshow" name="story${position}" data-slides="true">  
    ${slides.map(
      ({ alt, credits, title, renditions, id }) =>
        `<div class="bg-image"
        ${`data-src="${renditions[8].thumborUrl}" data-src-medium="${renditions[4].thumborUrl}" data-src-phone="${renditions[2].thumborUrl}"`}
        >
        <div class="caption">
            ${title}
            <span>${credits}</span>
        </div>
        </div>`,
    )}}
  </section>`;
}

module.exports = render;
