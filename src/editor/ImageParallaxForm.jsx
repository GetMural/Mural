import React from 'react';
import { observer } from 'mobx-react';
import {
  FormGroup,
  Fieldset,
  Legend,
  Label,
} from '@bootstrap-styled/v4';

import ImagePreviewField from './bites/ImagePreviewField';
import { Title, Subtitle, NavEntry, ButtonPanel } from './bites';
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
      <ButtonPanel onSave={onSave} />
    </FormLayout>
  );
}

export default observer(ImageParallaxForm);
