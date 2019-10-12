import React from 'react';
import {
  Fieldset,
  Legend,
  Input,
  Label,
  FormGroup,
} from '@bootstrap-styled/v4';
import { observer } from 'mobx-react';
import ImagePreviewField from './bites/ImagePreviewField';

const ImageCreditsForm = ({ image }) => {
  return (
    <Fieldset>
      <Legend>Image</Legend>
      <ImagePreviewField image={image} />
      <FormGroup>
        <Label>Alternative text</Label>
        <Input
          value={image.alt}
          onChange={e => {
            image.changeAlt(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label>Caption</Label>
        <Input
          onChange={e => {
            image.changeTitle(e.target.value);
          }}
          value={image.title}
        />
      </FormGroup>
      <FormGroup>
        <Label>Credits</Label>
        <Input
          value={image.credits}
          onChange={e => {
            image.changeCredits(e.target.value);
          }}
        />
      </FormGroup>
    </Fieldset>
  );
};

export default observer(ImageCreditsForm);
