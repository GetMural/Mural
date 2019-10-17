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
    <section
      className="part slideshow-horizontal snap"
      data-slideshow="true"
    >
      <div className="blueimp-gallery blueimp-gallery-carousel blueimp-gallery-controls">
        <div className="slides"></div>
        <a className="prev">&lsaquo;</a>
        <a className="next">&rsaquo;</a>
        <div className="slide-caption"></div>
        <div className="credits"></div>
      </div>

      <div className="slide-container">
        {slides.map(({ alt, credits, title, renditions, id }) => (
          <a
            key={id}
            urlset={getSrcSet(renditions)}
            href={renditions[0].thumborUrl}
            title={title}
            alt={alt}
            data-credits={credits}
          ></a>
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
