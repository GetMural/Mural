import React from 'react';

import StoryModel, { WorkspaceSettings } from './models/StoryModel';
import FileManager from './FileManager';
const Thumbor = require('thumbor');
const { Provider, Consumer } = React.createContext();

const settingsManager = new FileManager({ storyName: 'settings' });
const settingsState = WorkspaceSettings.create(
  settingsManager.read(),
  {
    fileManager: settingsManager,
  },
);

const createDraftStory = storyName => {
  return StoryModel.create(
    {},
    {
      fileManager: new FileManager({ storyName, readOnly: true }),
      thumbor: new Thumbor(
        settingsState.thumbor.key,
        settingsState.thumbor.host,
      ),
    },
  );
};

const getStoryState = storyName => {
  const fileManager = new FileManager({ storyName });
  const storyJson = fileManager.read();
  return StoryModel.create(storyJson, {
    fileManager,
    thumbor: new Thumbor(
      settingsState.thumbor.key,
      settingsState.thumbor.host,
    ),
  });
};

class WorkspaceProvider extends React.Component {
  state = {
    settingsState,
    storyState: getStoryState(settingsState.currentStory),
    currentStory: settingsState.currentStory,
    error: null,
  };

  handleSelectStory = storyName => {
    const storyState = getStoryState(storyName);
    this.setState({ currentStory: storyName, storyState }, () => {
      this.state.settingsState.changeStory(storyName);
    });
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          onSelectStory: this.handleSelectStory,
          createDraftStory,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { WorkspaceProvider, Consumer as WorkspaceConsumer };
