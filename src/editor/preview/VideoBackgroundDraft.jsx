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

function VideoBackgroundDraft({
  item: {
    title,
    subtitle,
    body,
    video: { preview, orientation },
    align,
    offset,
    useOffset,
  },
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
