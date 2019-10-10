import React from 'react';
import { string, func } from 'prop-types';
import { FormGroup, Label } from '@bootstrap-styled/v4';
import BasicField from './BasicField';
import { observer } from 'mobx-react';

function Title({ title, changeTitle }) {
  return (
    <FormGroup>
      <Label>Title</Label>
      <BasicField
        onChange={content => {
          changeTitle(content);
        }}
        value={title}
      />
    </FormGroup>
  );
}

Title.propTypes = {
  title: string.isRequired,
  changeTitle: func.isRequired,
};

export default observer(Title);
