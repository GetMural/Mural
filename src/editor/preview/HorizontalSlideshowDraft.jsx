/* eslint-disable react/no-danger */
import React from 'react';
import { string, shape, array } from 'prop-types';
import { observer } from 'mobx-react';

function HorizontalSlideshowDraft({ item: { slides } }) {
  return (
    <section class="part slideshow-horizontal snap">
      <div
        id="blueimp-gallery"
        class="blueimp-gallery blueimp-gallery-controls"
      >
        <div class="slides"></div>
        <h3 class="title"></h3>
        <a class="prev">‹</a>
        <a class="next">›</a>
        <a class="close">×</a>
        <a class="play-pause"></a>
        <ol class="indicator"></ol>
      </div>

      <div id="links">
        {slides.map(({ alt, credits }) => (
          <a href="images/banana.jpg" title="Banana">
            <img src="images/thumbnails/banana.jpg" alt="Banana" />
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
