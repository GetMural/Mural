import React from 'react';
import { shape, string } from 'prop-types';
import {
  Form,
  FormGroup,
  Input,
  Fieldset,
  Legend,
  Label,
  FormText,
  Container,
  Col,
  Row,
} from '@bootstrap-styled/v4';

function Settings(props) {
  let {
    config: {
      thumbor: { host, key },
    },
  } = props;

  return (
    <Container>
      <Form>
        <Fieldset>
          <Legend>Thumbor</Legend>
          <Label htmlFor="thumbor[host]">Host</Label>
          <Input
            type="text"
            id="thumbor[host]"
            value={host}
            onChange={(e) => {
              debugger;
              host = e.target.value;
            }}
          />
          <Label htmlFor="thumbor[key]">Key</Label>
          <Input
            type="text"
            id="thumbor[key]"
            value={key}
            onChange={(e) => {
              key = e.target.value;
            }}
          />
        </Fieldset>
      </Form>
    </Container>
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

export default Settings;
