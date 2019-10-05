import React from 'react';
import { observer } from 'mobx-react';
import { clone, applySnapshot, getSnapshot } from 'mobx-state-tree';

import ImageBackgroundForm from './ImageBackgroundForm';
import ImageParallaxForm from './ImageParallaxForm';

const StoryForms = {
  ImageBackground: ImageBackgroundForm,
  ImageParallax: ImageParallaxForm,
};

const Editor = props => {
  const {
    story: { items },
    match: {
      params: { itemNum },
    },
  } = props;

  const storyIndex = parseInt(itemNum, 10);
  const item = items[storyIndex];
  const clonedItem = clone(item);
  const Component = StoryForms[clonedItem.type];

  return (
    <Component
      draftItem={clonedItem}
      onSave={() => {
        applySnapshot(items[storyIndex], getSnapshot(clonedItem));
      }}
    />
  );
};

export default observer(Editor);
