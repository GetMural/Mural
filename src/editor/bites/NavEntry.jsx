import React from 'react';
import { string, func } from 'prop-types';
import {
  FormGroup,
  Input,
  Fieldset,
  Legend,
  Label,
  FormText,
} from '@bootstrap-styled/v4';

function NavEntry({ onChange, value }) {
  return (
    <Fieldset>
      <Legend>Navigation Entry</Legend>
      <FormGroup color="success" check>
        <Label htmlFor="nav_title">Title</Label>
        <Input type="text" id="nav_title" />
        <Label htmlFor="nav" check>
          <Input type="checkbox" id="nav" />
          {' Hide'}
        </Label>
        <FormText>Opt to not show this item in the navigation menu</FormText>
      </FormGroup>
    </Fieldset>
  );
}

NavEntry.propTypes = {
  value: string,
  onChange: func,
};

NavEntry.defaultProps = {
  value: '',
  onChange: null,
};

export default NavEntry;
