/* eslint-disable react/no-danger */
import React from 'react';
import { string } from 'prop-types';
import { observer } from 'mobx-react';

function ImageBackground(props) {
  const {
    item: { title, subtitle, body },
  } = props;
  return (
    <section className="part sticky-image" name="story-id">
      <div className="bg-image" />
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

ImageBackground.propTypes = {
  item: {
    title: string,
    subtitle: string,
    body: string,
  },
};

ImageBackground.defaultProps = {
  item: {
    title: '',
    subtitle: '',
    body: '',
  },
};

export default observer(ImageBackground);
