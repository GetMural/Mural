// Take the template from Mural 1 currently

function render(
  { title, subtitle, body, light, snippets },
  position,
) {
  return `<section class="no-effects part text_align-center ${
    light ? 'reverse_colors' : ''
  }" name="story${position}"
    ${snippets ? 'data-dynamic-image="true"' : ''}
    >
    <div class="content container-fluid">
    <div class="row">
      <div class="col-sm-12 header">
        ${title ? `<h1>${title}</h1>` : ''}
        ${subtitle ? `<h2>${subtitle}</h2>` : ''}
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6 text">
        ${body}
        ${snippets
          .map(
            ({
              align,
              body,
              image: { renditions, alt, credits, title },
            }) => `
          <figure class="cms-image ${align}">
          <img data-src="${renditions[0].thumborUrl}" rel="resizable" alt="${alt}" />
          <figcaption>
            ${title}
            <span class="photographer">
              ${credits}
            </span>
          </figcaption>
        </figure>
        ${body}
        `,
          )
          .join('')}
      </div>
    </div>
  </div>
</section>`;
}

module.exports = render;
