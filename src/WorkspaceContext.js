import React from 'react';

import StoryModel, { WorkspaceSettings } from './models/StoryModel';
import FileManager, {
  parseDataFile,
  SETTINGS_PATH,
} from './FileManager';

const { Provider, Consumer } = React.createContext();

const config = parseDataFile(SETTINGS_PATH);
const settingsState = WorkspaceSettings.create(config, {
  fileManager: new FileManager({ storyName: 'settings' }),
});

class WorkspaceProvider extends React.Component {
  state = {
    settingsState,
    storyState: {},
    currentStory: '',
    error: null,
  };

  handleSelectStory = storyName => {
    const fileManager = new FileManager({ storyName });
    const storyJson = fileManager.read();
    const storyState = StoryModel.create(storyJson, {
      fileManager,
    });
    this.setState({ currentStory: storyName, storyState });
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          onSelectStory: this.handleSelectStory,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { WorkspaceProvider, Consumer as WorkspaceConsumer };
