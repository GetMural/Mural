import React from 'react';
import { FormText } from '@bootstrap-styled/v4';

import MediaPreviewField from './MediaPreviewField';

const VideoPreviewField = ({ video }) => {
  return (
    <>
      <MediaPreviewField
        media={video}
        onUpdate={(path, name) => {
          video.uploadFile(path, name);
        }}
        acceptedMimeTypes={['video/mp4', 'video/ogg', 'video/webm']}
      >
        {({ preview }) => (
          <>
            <video src={preview} alt="Video" controls />
            <FormText color="muted">Video Preview</FormText>
          </>
        )}
      </MediaPreviewField>
    </>
  );
};

export default VideoPreviewField;
