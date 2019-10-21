import React from 'react';
import { observer } from 'mobx-react';
import {
  FormGroup,
  Fieldset,
  Legend,
  Label,
} from '@bootstrap-styled/v4';

import ImagePreviewField from './bites/ImagePreviewField';
import AudioPreviewField from './bites/AudioPreviewField';

import {
  Title,
  Subtitle,
  Body,
  NavEntry,
  ButtonPanel,
} from './bites';

function ImageBackgroundForm({ draftItem, onSave }) {
  return (
    <>
      <NavEntry />
      <Fieldset>
        <Legend>Item Content</Legend>
        <Title
          title={draftItem.title}
          changeTitle={draftItem.changeTitle}
        />
        <Subtitle
          subtitle={draftItem.subtitle}
          changeSubtitle={draftItem.changeSubtitle}
        />
        <Body
          body={draftItem.body}
          changeBody={draftItem.changeBody}
        />
      </Fieldset>
      <Fieldset>
        <FormGroup>
          <Label>Background Image</Label>
          <ImagePreviewField image={draftItem.image} />
        </FormGroup>
      </Fieldset>
      <Fieldset>
        <Label>Audio</Label>
        <AudioPreviewField audio={draftItem.audio} />
      </Fieldset>
      <ButtonPanel onSave={onSave} />
    </>
  );
}

export default observer(ImageBackgroundForm);
