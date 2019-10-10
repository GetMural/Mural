import React from 'react';
import { observer } from 'mobx-react';

import {
  Fieldset,
  Legend,
  Button,
  ButtonGroup,
  Input,
  Label,
  FormGroup,
} from '@bootstrap-styled/v4';

import { Title, Subtitle, Body, NavEntry } from './bites';
import FormLayout from './FormLayout';

function CentredTextForm(props) {
  const { draftItem, onSave } = props;
  return (
    <FormLayout draftItem={draftItem}>
      <NavEntry />
      <Fieldset>
        <Legend>Item Content</Legend>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={draftItem.light}
              onChange={draftItem.toggleLight}
            />{' '}
            Light
          </Label>
        </FormGroup>
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

export default observer(CentredTextForm);
