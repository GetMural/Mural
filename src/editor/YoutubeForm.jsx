import React from 'react';
import { observer } from 'mobx-react';
import {
  Fieldset,
  Label,
  FormGroup,
  Input,
} from '@bootstrap-styled/v4';

import { NavEntry, ButtonPanel } from './bites';

function YoutubeForm({ draftItem, onSave }) {
  return (
    <>
      <NavEntry />
      <Fieldset>
        <Label>Youtube Video Id</Label>
        <Input
          type="text"
          onChange={e => {
            draftItem.changeYoutubeId(e.target.value);
          }}
          value={draftItem.youtubeId}
        />
      </Fieldset>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            checked={draftItem.controls}
            onChange={draftItem.toggleControls}
          />{' '}
          Controls
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            checked={draftItem.autoAdvance}
            onChange={draftItem.toggleAutoAdvance}
          />{' '}
          Auto Advance
        </Label>
      </FormGroup>
      <ButtonPanel onSave={onSave} />
    </>
  );
}

export default observer(YoutubeForm);
