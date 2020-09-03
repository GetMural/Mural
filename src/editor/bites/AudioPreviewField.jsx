import React from 'react';
import { FormText } from '@bootstrap-styled/v4';

import MediaPreviewField from './MediaPreviewField';

const AudioPreviewField = ({ audio }) => {
  return (
    <>
      <MediaPreviewField
        media={audio}
        acceptedMimeTypes={[
          'audio/mpeg',
          'audio/ogg',
          'audio/vorbis',
          'audio/opus',
        ]}
      >
        {({ preview }) => (
          <>
            <audio src={preview} alt="Audio" controls />
            <FormText color="muted">Audio Preview</FormText>
          </>
        )}
      </MediaPreviewField>
    </>
  );
};

export default AudioPreviewField;
