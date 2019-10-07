import React from 'react';
import { WorkspaceConsumer } from '../WorkspaceContext';

import ImageBackgroundDraft from './preview/ImageBackgroundDraft';
import ImageParallaxDraft from './preview/ImageParallaxDraft';

const StoryItems = {
  ImageBackground: ImageBackgroundDraft,
  ImageParallax: ImageParallaxDraft,
};

const Preview = () => {
  return (
    <WorkspaceConsumer>
      {({ storyState }) =>
        storyState.items.map((storyItem, i) => {
          const Component = StoryItems[storyItem.type];
          return <Component item={storyItem}></Component>;
        })
      }
    </WorkspaceConsumer>
  );
};

export default Preview;
