import React from 'react';
import {
  Fieldset,
  Legend,
  Input,
  Label,
  FormGroup,
} from '@bootstrap-styled/v4';
import { observer } from 'mobx-react';
import { Title, Body } from './bites';
import ImagePreviewField from './bites/ImagePreviewField';
import Alignment from './bites/Alignment';

const TextImageItemForm = ({ item }) => {
  return (
    <Fieldset>
      <Legend>Image Item</Legend>
      <Alignment
        value={item.align}
        changeAlignment={item.changeAlignment}
      />
      <Title title={item.title} changeTitle={item.changeTitle} />
      <Body body={item.body} changeBody={item.changeBody} />
      <ImagePreviewField image={item.image} />
      <FormGroup>
        <Label>Image alt</Label>
        <Input
          value={item.image.alt}
          onChange={e => {
            item.image.changeAlt(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label>Image Credits</Label>
        <Input
          value={item.image.credits}
          onChange={e => {
            item.image.changeCredits(e.target.value);
          }}
        />
      </FormGroup>
    </Fieldset>
  );
};

export default TextImageItemForm;
