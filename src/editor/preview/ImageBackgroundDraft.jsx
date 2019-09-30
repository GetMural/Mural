/* eslint-disable react/no-danger */
import React from 'react';
import { string, shape } from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';

// 'background-image': `url(${src})`,
// position: active ? 'fixed' : ''

const BackgroundImage = styled.div`
  position: fixed;
  background: url(${(props) => props.srcImage});
  width: 100%;
  height: 100vh;
  background-position: center center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
`;

function ImageBackgroundDraft(props) {
  const {
    item: {
      title,
      subtitle,
      body,
      image: { preview },
    },
  } = props;
  return (
    <section className="part sticky-image" name="story-id">
      <BackgroundImage className="bg-image" srcImage={preview} />
      <div className="content container-fluid">
        <div className="row">
          <div className="col-sm-12 header-fullpage">
            <div className="middle">
              <h1 dangerouslySetInnerHTML={{ __html: title }} />
              <h2 dangerouslySetInnerHTML={{ __html: subtitle }} />
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col-xs-12 col-sm-10 col-md-8 col-lg-6 text"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      </div>
    </section>
  );
}

ImageBackgroundDraft.propTypes = {
  item: shape({
    title: string,
    subtitle: string,
    body: string,
    image: shape({
      preview: string,
      path: string,
    }),
  }),
};

ImageBackgroundDraft.defaultProps = {
  item: {
    title: '',
    subtitle: '',
    body: '',
    image: { preview: '', path: '' },
  },
};

export default observer(ImageBackgroundDraft);
