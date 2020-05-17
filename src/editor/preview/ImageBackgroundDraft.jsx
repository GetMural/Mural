/* eslint-disable react/no-danger */
import React from 'react';
import { string, shape, arrayOf, number } from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import classnames from 'classnames';

const BackgroundImage = styled.div`
  ${props =>
    props.srcImages.map(
      rendition => `
    @media only screen and (min-resolution: ${rendition.scale}dppx) and (min-width: ${rendition.w}px) {
      background-image: url(${rendition.thumborUrl});
    }
  `,
    )}
`;

function ImageBackgroundDraft(props) {
  const {
    item: {
      title,
      subtitle,
      body,
      image: { renditions },
      isFullPage,
    },
    isActive,
  } = props;

  const headerClasses = classnames('col-sm-12', {
    'header-fullpage': isFullPage,
  });

  return (
    <section className="part sticky-image">
      <BackgroundImage
        className="bg-image"
        srcImages={renditions}
        isActive={isActive}
      />
      <div className="content container-fluid">
        <div className="row">
          <div className={headerClasses}>
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

ImageBackgroundDraft.propTypes = {
  item: shape({
    title: string,
    subtitle: string,
    body: string,
    image: shape({
      renditions: arrayOf(
        shape({
          thumborUrl: string,
          w: number,
          h: number,
          scale: number,
        }),
      ),
    }),
  }),
};

ImageBackgroundDraft.defaultProps = {
  item: {
    title: '',
    subtitle: '',
    body: '',
    image: { renditions: [] },
  },
  isActive: false,
};

export default observer(ImageBackgroundDraft);
