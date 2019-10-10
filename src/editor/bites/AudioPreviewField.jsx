import React from 'react';
import { FormText } from '@bootstrap-styled/v4';

import MediaPreviewField from './MediaPreviewField';

const AudioPreviewField = ({ audio }) => {
  return (
    <>
      <MediaPreviewField
        media={audio}
        onUpdate={(path, name) => {
          audio.uploadFile(path, name);
        }}
        acceptedMimeTypes={[
          'audio/mpeg',
          'audio/ogg',
          'audio/vorbis',
          'audio/opus',
        ]}
      >
        {({ preview }) => (
          <>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio src={preview} alt="Audio" controls />
            <FormText color="muted">Background Audio</FormText>
          </>
        )}
      </MediaPreviewField>
    </>
  );
};

export default AudioPreviewField;
