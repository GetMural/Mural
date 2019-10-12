/* eslint-disable react/no-danger */
import React from 'react';
import { string, shape, array } from 'prop-types';
import { observer } from 'mobx-react';

function HorizontalSlideshowDraft({ item: { slides } }) {
  return (
    <section class="part slideshow-horizontal snap">
      <div class="blueimp-gallery blueimp-gallery-carousel blueimp-gallery-controls">
        <div class="slides"></div>
        <a class="prev">&lsaquo;</a>
        <a class="next">&rsaquo;</a>
        <div class="slide-caption"></div>
        <div class="credits"></div>
      </div>

      <div class="slide-container"></div>
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
