import React from 'react';
import DraftStory from './DraftStory';
import DraftItem from './DraftItem';
import { WorkspaceConsumer } from '../WorkspaceContext';

const Preview = () => {
  return (
    <DraftStory>
      <WorkspaceConsumer>
        {({ storyState }) =>
          storyState.items.map((storyItem, i) => {
            return (
              <DraftItem
                key={storyItem.id}
                item={storyItem}
              ></DraftItem>
            );
          })
        }
      </WorkspaceConsumer>
    </DraftStory>
  );
};

export default Preview;
