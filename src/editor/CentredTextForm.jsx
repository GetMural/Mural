import React from 'react';
import {
  Fieldset,
  Legend,
  Button,
  Input,
  Label,
  FormGroup,
} from '@bootstrap-styled/v4';
import { observer } from 'mobx-react';

import {
  Title,
  Subtitle,
  Body,
  NavEntry,
  ButtonPanel,
} from './bites';
import FormLayout from './FormLayout';
import TextImageItemForm from './TextImageItemForm';

function CentredTextForm({ draftItem, onSave }) {
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
      {draftItem.snippets.map(snippet => (
        <TextImageItemForm item={snippet} key={snippet.id} />
      ))}
      <div>
        <Button
          type="button"
          color="success"
          onClick={draftItem.addSnippet}
        >
          Add Image
        </Button>
      </div>
      <ButtonPanel onSave={onSave} />
    </FormLayout>
  );
}

export default observer(CentredTextForm);
