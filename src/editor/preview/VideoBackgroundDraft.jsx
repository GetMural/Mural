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

function VideoBackgroundDraft({
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
  const contentClasses = classnames(
    'col-sm-12',
    'header-fullpage',
    `text-${align}`,
  );

  return (
    <section className="st-video part">
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
      <div className="content container-fluid">
        <div className="row">
          <div className={contentClasses}>
            <div className="middle text-shadow">
              <h1 dangerouslySetInnerHTML={{ __html: title }} />
              <h2 dangerouslySetInnerHTML={{ __html: subtitle }} />
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col-xs-12 col-sm-10 col-md-8 col-lg-6 text text-shadow"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      </div>
    </section>
  );
}

VideoBackgroundDraft.propTypes = {
  item: shape({
    title: string,
    subtitle: string,
    body: string,
  }),
};

VideoBackgroundDraft.defaultProps = {
  item: {
    title: '',
    subtitle: '',
    body: '',
  },
};

export default observer(VideoBackgroundDraft);
