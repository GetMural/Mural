import React from 'react';
import {
  Fieldset,
  Legend,
  Input,
  Label,
  FormGroup,
} from '@bootstrap-styled/v4';
import { observer } from 'mobx-react';
import { Body } from './bites';
import ImagePreviewField from './bites/ImagePreviewField';
import Alignment from './bites/Alignment';

const TextImageItemForm = ({ item }) => {
  return (
    <Fieldset>
      <Legend>Image Item</Legend>
      <Alignment
        value={item.align}
        changeAlignment={item.changeAlignment}
        uuid={item.id}
      />
      <ImagePreviewField image={item.image} />
      <FormGroup>
        <Label>Alternative text</Label>
        <Input
          value={item.image.alt}
          onChange={e => {
            item.image.changeAlt(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label>Caption</Label>
        <Input
          onChange={e => {
            item.changeTitle(e.target.value);
          }}
          value={item.title}
        />
      </FormGroup>
      <FormGroup>
        <Label>Credits</Label>
        <Input
          value={item.image.credits}
          onChange={e => {
            item.image.changeCredits(e.target.value);
          }}
        />
      </FormGroup>
      <Body body={item.body} changeBody={item.changeBody} />
    </Fieldset>
  );
};

export default observer(TextImageItemForm);
