/* eslint-disable react/no-danger */
import React from 'react';
import { string, shape, number, arrayOf } from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const BackgroundImage = styled.div`
  position: fixed;

  ${props =>
    props.srcImages.map(
      rendition => `
    @media only screen and (min-resolution: ${rendition.scale}dppx) and (min-width: ${rendition.w}px) {
      background-image: url(${rendition.thumborUrl});
    }
  `,
    )}
`;

function ImageParallaxDraft(props) {
  const {
    item: {
      title,
      subtitle,
      image: { renditions },
    },
  } = props;
  return (
    <section className="part parallax">
      <BackgroundImage className="bg-image" srcImages={renditions} />
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

ImageParallaxDraft.propTypes = {
  item: shape({
    title: string,
    subtitle: string,
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

ImageParallaxDraft.defaultProps = {
  item: {
    title: '',
    subtitle: '',
    body: '',
    image: { renditions: [] },
  },
};

export default observer(ImageParallaxDraft);
