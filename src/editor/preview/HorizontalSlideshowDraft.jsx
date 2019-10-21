/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-danger */
import React from 'react';
import { shape, array } from 'prop-types';
import { observer } from 'mobx-react';

function getSrcSet(renditions) {
  return renditions
    .map(
      rendition =>
        `${rendition.thumborUrl} ${rendition.w * rendition.scale}w`,
    )
    .join(', ');
}

function getHref(renditions) {
  if (renditions.length) {
    return renditions[0].thumborUrl;
  }

  return '';
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
            data-urlset={getSrcSet(renditions)}
            href={getHref(renditions)}
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
