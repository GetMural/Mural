import React from 'react';
import DraftStory from './DraftStory';
import DraftItem from './DraftItem';
import { WorkspaceConsumer } from '../WorkspaceContext';

const Preview = () => {
  return (
    <WorkspaceConsumer>
      {({ storyState }) => (
        <DraftStory
          draftStory={storyState}
          modified={storyState.lastModified}
          width="100%"
        >
          {storyState.items.map((storyItem, i) => {
            return (
              <DraftItem
                key={storyItem.id}
                item={storyItem}
                isActive={i === 0}
              ></DraftItem>
            );
          })}
        </DraftStory>
      )}
    </WorkspaceConsumer>
  );
};

export default Preview;
