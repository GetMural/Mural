/* eslint-disable react/no-danger */
import React from 'react';
import { string, shape } from 'prop-types';
import { observer } from 'mobx-react';
import classnames from 'classnames';

import SnippetDraft from './SnippetDraft';

function CentredTextDraft(props) {
  const {
    item: { title, subtitle, body, light, snippets },
  } = props;

  const sectionClasses = classnames(
    'no-effects',
    'part',
    'text_align-center',
    { reverse_colors: light },
  );
  return (
    <section className={sectionClasses}>
      <div className="content container-fluid">
        <div className="row">
          <div className="col-sm-12 header">
            <h1 dangerouslySetInnerHTML={{ __html: title }} />
            <h2 dangerouslySetInnerHTML={{ __html: subtitle }} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6 text">
            <div dangerouslySetInnerHTML={{ __html: body }} />
            {snippets.map((snippet, i) => (
              <SnippetDraft key={i} snippet={snippet} />
            ))}
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
