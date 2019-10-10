/* eslint-disable react/no-danger */
import React from 'react';
import { string, shape } from 'prop-types';
import { observer } from 'mobx-react';

function CentredTextDraft(props) {
  const {
    item: { title, subtitle, body },
  } = props;
  return (
    <section className="part parallax">
      <div className="content container-fluid">
        <div className="row">
          <div className="col-sm-12 header-fullpage">
            <h1 dangerouslySetInnerHTML={{ __html: title }} />
            <h2 dangerouslySetInnerHTML={{ __html: subtitle }} />
          </div>
        </div>
      </div>
    </section>
  );
}

CentredTextDraft.propTypes = {
  item: shape({
    title: string,
    subtitle: string,
    body: string,
  }),
};

CentredTextDraft.defaultProps = {
  item: {
    title: '',
    subtitle: '',
    body: '',
  },
};

export default observer(CentredTextDraft);
