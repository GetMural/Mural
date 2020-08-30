/* eslint-disable react/no-danger */
import React from 'react';
import { string, shape } from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import classnames from 'classnames';

const BackgroundVideo = styled.div`
  @media (orientation: portrait) {
    margin-left: calc(
      ${props =>
        `(${props.videoWidth}px - 100%) * -${props.videoOffset}/100`}
    );
  }
`;

function VideoFullPageDraft({
  item: {
    title,
    subtitle,
    body,
    video: { preview, orientation, dimensions },
    align,
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
      <BackgroundVideo
        className="video-container"
        videoOffset={
          orientation === 'landscape' && useOffset ? offset : 0
        }
        videoWidth={(height / dimensions.h) * dimensions.w}
      >
        <video
          src={preview}
          playsInline={true}
          loop={true}
          className={videoClasses}
        ></video>
      </BackgroundVideo>
      <div className="caption">
        <div className="button-container play"></div>
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
