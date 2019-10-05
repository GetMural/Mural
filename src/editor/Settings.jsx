import React from 'react';
import { shape, string } from 'prop-types';
import { Container } from '@bootstrap-styled/v4';
import { clone, applySnapshot, getSnapshot } from 'mobx-state-tree';
import SettingsForm from './SettingsForm';

function Settings(props) {
  const { config } = props;

  const clonedConfig = clone(config);

  return (
    <Container>
      <SettingsForm
        config={clonedConfig}
        onSave={() => {
          applySnapshot(config, getSnapshot(clonedConfig));
        }}
      />
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
