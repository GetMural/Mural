import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

const Img = styled.img`
  max-width: 200px;
  max-height: 200px;
`;

const Rendition = styled.div``;

const RenditionContainer = styled.div``;

const Renditions = ({ image }) => (
  <RenditionContainer>
    {image.renditions.map(rendition => (
      <Rendition
        key={`${rendition.w}x${rendition.h}x${rendition.scale}`}
      >
        <div>{`${rendition.w}x${rendition.h} scale ${rendition.scale}`}</div>
        <Img
          src={rendition.thumborUrl}
          alt={`${rendition.w}x${rendition.h} scale ${rendition.scale}`}
        />
      </Rendition>
    ))}
  </RenditionContainer>
);

export default observer(Renditions);
