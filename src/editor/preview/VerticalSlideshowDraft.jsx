/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-danger */
import React from 'react';
import { shape, array } from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const BackgroundImage = styled.div`
  ${props =>
    props.srcImages.map(
      rendition => `
    @media only screen and (min-resolution: ${rendition.scale}dppx) and (min-width: ${rendition.w}px) {
      background-image: url(${rendition.thumborUrl});
    }
  `,
    )}
`;

function VerticalSlideshowDraft({ item: { slides } }) {
  return (
    <section className="part slideshow" data-slideshow="true">
      {slides.map(({ alt, credits, title, renditions, id }) => (
        <BackgroundImage
          key={id}
          className="bg-image"
          srcImages={renditions}
        >
          <div className="caption">
            {title}
            <span>{credits}</span>
          </div>
        </BackgroundImage>
      ))}
    </section>
  );
}

VerticalSlideshowDraft.propTypes = {
  item: shape({
    slides: array,
  }),
};

VerticalSlideshowDraft.defaultProps = {
  item: {
    slides: [],
  },
};

export default observer(VerticalSlideshowDraft);
