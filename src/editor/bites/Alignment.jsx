import React from 'react';
import { Input, Label, FormGroup } from '@bootstrap-styled/v4';
import { observer } from 'mobx-react';

const Alignment = ({ value, changeAlignment, uuid }) => {
  return (
    <>
      <FormGroup check>
        <Label check>
          <Input
            type="radio"
            name={`align-${uuid}`}
            value="left"
            checked={value === 'left'}
            onChange={e => {
              debugger;
              changeAlignment(e.target.value);
            }}
          />
          Left
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="radio"
            name={`align-${uuid}`}
            value="center"
            checked={value === 'center'}
            onChange={e => {
              debugger;
              changeAlignment(e.target.value);
            }}
          />
          Centre
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="radio"
            name={`align-${uuid}`}
            value="right"
            checked={value === 'right'}
            onChange={e => {
              debugger;
              changeAlignment(e.target.value);
            }}
          />
          Right
        </Label>
      </FormGroup>
    </>
  );
};

export default observer(Alignment);
