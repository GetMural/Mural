/* eslint-disable react/no-danger */
import React from 'react';
import { string, shape, array } from 'prop-types';
import { observer } from 'mobx-react';

function getSrcSet(renditions) {
  return renditions
    .map(
      rendition =>
        `${rendition.thumborUrl} ${rendition.w * rendition.scale}w`,
    )
    .join(', ');
}

function HorizontalSlideshowDraft({ item: { slides } }) {
  return (
    <section className="part slideshow-horizontal snap">
      <div
        id="blueimp-gallery"
        className="blueimp-gallery blueimp-gallery-controls"
      >
        <div className="slides"></div>
        <h3 className="title"></h3>
        <a className="prev">‹</a>
        <a className="next">›</a>
        <a className="close">×</a>
        <a className="play-pause"></a>
        <ol className="indicator"></ol>
      </div>

      <div id="links">
        {slides.map(({ alt, credits, title, renditions, id }) => (
          <a
            key={id}
            urlset={getSrcSet(renditions)}
            title={title}
            alt={alt}
          >
            <img srcSet={getSrcSet(renditions)}></img>
          </a>
        ))}
      </div>
    </section>
  );
}

HorizontalSlideshowDraft.propTypes = {
  item: shape({
    slides: array,
  }),
};

HorizontalSlideshowDraft.defaultProps = {
  item: {
    slides: [],
  },
};

export default observer(HorizontalSlideshowDraft);
