/* eslint-disable react/no-danger */
import React from 'react';
import { string, shape } from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const BackgroundVideo = styled.div`
  position: absolute;
`;

function VideoBackgroundDraft(props) {
  const {
    item: {
      title,
      subtitle,
      body,
      video: { preview, orientation },
    },
  } = props;
  return (
    <section className="st-video part">
      <BackgroundVideo className="video-container">
        <video src={preview} className={orientation}></video>
      </BackgroundVideo>
      <div className="content container-fluid">
        <div className="row">
          <div className="col-sm-12 header-fullpage">
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
