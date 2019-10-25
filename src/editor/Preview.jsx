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
        >
          {storyState.items.map(storyItem => {
            return (
              <DraftItem
                key={storyItem.id}
                item={storyItem}
              ></DraftItem>
            );
          })}
        </DraftStory>
      )}
    </WorkspaceConsumer>
  );
};

export default Preview;
