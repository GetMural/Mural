import React from 'react';
import styled from 'styled-components';
import { FormText } from '@bootstrap-styled/v4';
import { observer } from 'mobx-react';
import MediaPreviewField from './MediaPreviewField';

const Img = styled.img`
  max-width: 200px;
  max-height: 200px;
`;
const ImagePreviewField = ({ image }) => {
  return (
    <MediaPreviewField
      media={image}
      onUpdate={(path, name) => {
        image.uploadFile(path, name);
      }}
      acceptedMimeTypes={['image/jpeg', 'image/png', 'image/webp']}
    >
      {({ preview }) => (
        <>
          <Img src={preview} alt="Image preview" />
          <FormText color="muted">Image Preview</FormText>
        </>
      )}
    </MediaPreviewField>
  );
};

export default observer(ImagePreviewField);
