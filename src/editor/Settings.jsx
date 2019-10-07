import React from 'react';
import { shape, string } from 'prop-types';
import { Container } from '@bootstrap-styled/v4';
import { clone, applySnapshot, getSnapshot } from 'mobx-state-tree';
import SettingsForm from './SettingsForm';
import { WorkspaceConsumer } from '../WorkspaceContext';
import Layout from './Layout';

function Settings(props) {
  return (
    <WorkspaceConsumer>
      {({ settingsState }) => {
        const clonedConfig = clone(settingsState);
        return (
          <Layout>
            <Container>
              <SettingsForm
                config={clonedConfig}
                onSave={() => {
                  applySnapshot(
                    settingsState,
                    getSnapshot(clonedConfig),
                  );
                }}
              />
            </Container>
          </Layout>
        );
      }}
    </WorkspaceConsumer>
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
