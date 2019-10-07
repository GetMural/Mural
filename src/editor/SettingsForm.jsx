import React from 'react';
import { shape, string } from 'prop-types';
import { observer } from 'mobx-react';
import {
  Form,
  Input,
  Fieldset,
  Legend,
  Label,
  Button,
  ButtonGroup,
} from '@bootstrap-styled/v4';

function Settings(props) {
  const { config, onSave } = props;

  return (
    <Form>
      <Fieldset>
        <Legend>Thumbor</Legend>
        <Label htmlFor="thumbor[host]">Host</Label>
        <Input
          type="text"
          id="thumbor[host]"
          value={config.thumbor.host}
          onChange={e => {
            config.thumbor.changeHost(e.target.value);
          }}
        />
        <Label htmlFor="thumbor[key]">Key</Label>
        <Input
          type="text"
          id="thumbor[key]"
          value={config.thumbor.key}
          onChange={e => {
            config.thumbor.changeKey(e.target.value);
          }}
        />
      </Fieldset>
      <ButtonGroup>
        <Button color="secondary">Cancel</Button>
        <Button color="secondary">Reset</Button>
        <Button color="primary" onClick={onSave}>
          Save
        </Button>
      </ButtonGroup>
    </Form>
  );
}

Settings.propTypes = {
  config: shape({
    thumbor: shape({
      host: string,
      key: string,
    }),
  }),
};

Settings.defaultProps = {
  config: {
    thumbor: {
      host: '',
      key: '',
    },
  },
};

export default observer(Settings);
