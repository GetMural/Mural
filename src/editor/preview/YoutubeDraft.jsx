/* eslint-disable react/no-danger */
import React from 'react';
import { string, boolean, shape } from 'prop-types';
import { observer } from 'mobx-react';

function YoutubeDraft({
  item: { youtubeId, controls, autoAdvance },
}) {
  return (
    <section
      className="st-video part"
      data-youtube-id={youtubeId}
      data-controls={controls}
      data-auto-advance={autoAdvance}
    >
      <div className="video-container">
        <div id="ytPlayer"></div>
      </div>
    </section>
  );
}

YoutubeDraft.propTypes = {
  item: shape({
    youtubeId: string,
    controls: boolean,
    autoAdvance: boolean,
  }),
};

YoutubeDraft.defaultProps = {
  item: {
    youtubeId: '',
    controls: false,
    autoAdvance: false,
  },
};

export default observer(YoutubeDraft);
