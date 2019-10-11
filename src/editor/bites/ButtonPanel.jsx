import React from 'react';
import { Button, ButtonGroup } from '@bootstrap-styled/v4';
import { observer } from 'mobx-react';

const ButtonPanel = ({ onSave }) => {
  return (
    <ButtonGroup>
      <Button color="primary" onClick={onSave}>
        Save
      </Button>
    </ButtonGroup>
  );
};

export default observer(ButtonPanel);
