import React from 'react';
import { observer } from 'mobx-react';
import { Fieldset, Legend, Label } from '@bootstrap-styled/v4';

import VideoPreviewField from './bites/VideoPreviewField';

import {
  Title,
  Subtitle,
  Body,
  NavEntry,
  ButtonPanel,
} from './bites';
import FormLayout from './FormLayout';

function VideoBackgroundForm({ draftItem, onSave }) {
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
        <Label>Background Video</Label>
        <VideoPreviewField video={draftItem.video} />
      </Fieldset>
      <ButtonPanel onSave={onSave} />
    </FormLayout>
  );
}

export default observer(VideoBackgroundForm);
