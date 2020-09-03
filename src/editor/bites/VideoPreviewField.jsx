import React from 'react';
import { observer } from 'mobx-react';
import { FormText } from '@bootstrap-styled/v4';
import styled from 'styled-components';
import MediaPreviewField from './MediaPreviewField';

const Video = styled.video`
  max-width: 300px;
  max-height: 300px;
`;

const VideoPreviewField = ({ video }) => {
  return (
    <MediaPreviewField
      media={video}
      acceptedMimeTypes={['video/mp4']}
    >
      {({ preview }) => (
        <>
          <Video src={preview} alt="Video" controls />
          <FormText color="muted">Video Preview</FormText>
          <FormText color="muted">
            {video.orientation} {video.dimensions.w}x
            {video.dimensions.h}
          </FormText>
        </>
      )}
    </MediaPreviewField>
  );
};

export default observer(VideoPreviewField);
