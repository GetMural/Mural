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
import { Title, Subtitle, NavEntry } from './bites';
import FormLayout from './FormLayout';

function ImageParallaxForm(props) {
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
      </Fieldset>
      <Fieldset>
        <FormGroup>
          <Label>Background Image</Label>
          <ImagePreviewField image={draftItem.image} />
        </FormGroup>
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

export default observer(ImageParallaxForm);
