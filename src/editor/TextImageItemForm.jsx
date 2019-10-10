import React from 'react';
import {
  Fieldset,
  Legend,
  Input,
  Label,
  FormGroup,
} from '@bootstrap-styled/v4';
import { Title, Body } from './bites';
import ImagePreviewField from './bites/ImagePreviewField';

const TextImageItemForm = ({ item }) => {
  return (
    <Fieldset>
      <Legend>Image Item</Legend>
      <FormGroup check>
        <Label check>
          <Input type="radio" name="align" value="left" />
          Left
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="radio" name="align" value="center" />
          Centre
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="radio" name="align" value="right" />
          Right
        </Label>
      </FormGroup>
      <Title title={item.title} changeTitle={item.changeTitle} />
      <Body body={item.body} changeBody={item.changeBody} />
      <ImagePreviewField image={item.image} />
    </Fieldset>
  );
};

export default TextImageItemForm;
