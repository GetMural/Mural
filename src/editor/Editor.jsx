import React from 'react';
import { observer } from 'mobx-react';
import { clone, applySnapshot, getSnapshot } from 'mobx-state-tree';
import { WorkspaceConsumer } from '../WorkspaceContext';

import ImageBackgroundForm from './ImageBackgroundForm';
import ImageParallaxForm from './ImageParallaxForm';

const StoryForms = {
  ImageBackground: ImageBackgroundForm,
  ImageParallax: ImageParallaxForm,
};

const Editor = props => {
  const {
    match: {
      params: { itemNum },
    },
  } = props;

  const storyIndex = parseInt(itemNum, 10);

  return (
    <WorkspaceConsumer>
      {({ storyState, currentStory }) => {
        debugger;
        const item = storyState.items[storyIndex];
        const clonedItem = clone(item);
        const Component = StoryForms[clonedItem.type];
        return (
          <Component
            draftItem={clonedItem}
            onSave={() => {
              applySnapshot(
                storyState.items[storyIndex],
                getSnapshot(clonedItem),
              );
            }}
          />
        );
      }}
    </WorkspaceConsumer>
  );
};

export default observer(Editor);
