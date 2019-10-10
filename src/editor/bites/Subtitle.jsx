import React from 'react';
import { string, func } from 'prop-types';
import { FormGroup, Label } from '@bootstrap-styled/v4';
import BasicField from './BasicField';
import { observer } from 'mobx-react';

function Subtitle({ subtitle, changeSubtitle }) {
  return (
    <FormGroup>
      <Label>Subtitle</Label>
      <BasicField
        onChange={content => {
          changeSubtitle(content);
        }}
        value={subtitle}
      />
    </FormGroup>
  );
}

Subtitle.propTypes = {
  subtitle: string.isRequired,
  changeSubtitle: func.isRequired,
};

export default observer(Subtitle);
