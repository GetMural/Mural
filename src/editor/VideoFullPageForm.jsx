import React from 'react';
import { observer } from 'mobx-react';
import {
  Fieldset,
  Legend,
  Label,
  FormGroup,
  Input,
} from '@bootstrap-styled/v4';

import VideoPreviewField from './bites/VideoPreviewField';

import { Title, Body, NavEntry, ButtonPanel } from './bites';

function VideoFullPageForm({ draftItem, onSave }) {
  return (
    <>
      <NavEntry />
      <Fieldset>
        <Legend>Item Content</Legend>
        <Title
          title={draftItem.title}
          changeTitle={draftItem.changeTitle}
        />
        <Body
          body={draftItem.body}
          changeBody={draftItem.changeBody}
        />
      </Fieldset>
      <Fieldset>
        <Label>Video</Label>
        <VideoPreviewField video={draftItem.video} />
      </Fieldset>
      {draftItem.video.orientation === 'landscape' && (
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={draftItem.useOffset}
              onChange={draftItem.toggleOffsetUse}
            />{' '}
            Use Offset
          </Label>
          {draftItem.video.orientation === 'landscape' &&
            draftItem.useOffset && (
              <FormGroup>
                <Label>Offset</Label>
                <Input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={draftItem.offset}
                  onChange={e => {
                    draftItem.updateOffset(
                      parseInt(e.target.value, 10),
                    );
                  }}
                />{' '}
              </FormGroup>
            )}
        </FormGroup>
      )}
      <FormGroup check>
        <Label check>
          <Input
            type="radio"
            name="playback"
            value="loop"
            defaultChecked
            checked={draftItem.playback === 'loop'}
            onChange={e => {
              draftItem.changePlayback('loop');
            }}
          />{' '}
          Loop
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="radio"
            name="playback"
            value="autoAdvance"
            checked={draftItem.playback === 'autoAdvance'}
            onChange={e => {
              draftItem.changePlayback('autoAdvance');
            }}
          />{' '}
          Auto Advance
        </Label>
      </FormGroup>
      <ButtonPanel onSave={onSave} />
    </>
  );
}

export default observer(VideoFullPageForm);
