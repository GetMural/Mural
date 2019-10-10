import React from 'react';
import { observer } from 'mobx-react';
import {
  FormGroup,
  Fieldset,
  Legend,
  Label,
  Button,
  ButtonGroup,
} from '@bootstrap-styled/v4';

import ImagePreviewField from './bites/ImagePreviewField';
import AudioPreviewField from './bites/AudioPreviewField';

import { Title, Subtitle, Body, NavEntry } from './bites';
import FormLayout from './FormLayout';

function ImageBackgroundForm(props) {
  const { draftItem, onSave } = props;
  return (
    <FormLayout draftItem={draftItem}>
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
      <ButtonGroup>
        <Button color="secondary">Cancel</Button>
        <Button color="secondary">Reset</Button>
        <Button color="primary" onClick={onSave}>
          Save
        </Button>
      </ButtonGroup>
    </FormLayout>
  );
}

export default observer(ImageBackgroundForm);
