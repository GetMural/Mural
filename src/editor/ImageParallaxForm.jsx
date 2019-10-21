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

function ImageParallaxForm({ draftItem, onSave }) {
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
      </Fieldset>
      <Fieldset>
        <FormGroup>
          <Label>Background Image</Label>
          <ImagePreviewField image={draftItem.image} />
        </FormGroup>
      </Fieldset>
      <ButtonPanel onSave={onSave} />
    </>
  );
}

export default observer(ImageParallaxForm);
