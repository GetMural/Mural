import React from 'react';
import { string, func } from 'prop-types';
import { FormGroup, Label } from '@bootstrap-styled/v4';
import RichTextField from './RichTextField';
import { observer } from 'mobx-react';

function Body({ changeBody, body }) {
  return (
    <FormGroup>
      <Label>Subtitle</Label>
      <RichTextField
        onChange={content => {
          changeBody(content);
        }}
        value={body}
      />
    </FormGroup>
  );
}

Body.propTypes = {
  body: string.isRequired,
  changeBody: func.isRequired,
};

export default observer(Body);
