/* eslint-disable react/no-danger */
import React from 'react';
import { string, shape } from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import classnames from 'classnames';

const Video = styled.video`
  @media (orientation: portrait) {
    position: absolute;
    top: 50%;
    left: ${props => `${props.videoOffset}%`};
    transform: ${props => `translate(-${props.videoOffset}%, -50%)`};
    height: 100%;
    min-height: 0 !important;
  }
`;

function VideoFullPageDraft({
  item: {
    title,
    body,
    video: { preview, orientation },
    offset,
    useOffset,
  },
  height,
}) {
  const videoClasses = classnames(`${orientation}`, {
    offset: useOffset,
  });

  return (
    <section className="st-content-video part snap">
      <div className="video-container">
        <Video
          src={preview}
          playsInline={true}
          loop={true}
          className={videoClasses}
          videoOffset={
            orientation === 'landscape' && useOffset ? offset : 0
          }
        ></Video>
      </div>
      <div className="caption">
        <div
          className="button-container play"
          style={{ display: 'none' }}
        ></div>
        <div className="button-container pause"></div>
        <div className="text">
          <h3>{title}</h3>
          {body}
        </div>
      </div>
    </section>
  );
}

VideoFullPageDraft.propTypes = {
  item: shape({
    title: string,
    body: string,
  }),
};

VideoFullPageDraft.defaultProps = {
  item: {
    title: '',
    body: '',
  },
};

export default observer(VideoFullPageDraft);
