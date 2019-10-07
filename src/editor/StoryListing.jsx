import React from 'react';
import { H3 } from '@bootstrap-styled/v4';
import { WorkspaceConsumer } from '../WorkspaceContext';
import Layout from './Layout';
import { StoryItem } from '../models/StoryModel';
import ItemList from './ItemList';

const StoryListing = props => {
  return (
    <WorkspaceConsumer>
      {({ storyState, currentStory }) => {
        return (
          <Layout>
            <H3>Current Story: {currentStory}</H3>
            <div>
              <label htmlFor="new_story">New Item</label>
              <button
                onClick={() => {
                  storyState.addItem(StoryItem.create());
                }}
              >
                ImageBackground
              </button>
            </div>
            <ItemList items={storyState.items} />
          </Layout>
        );
      }}
    </WorkspaceConsumer>
  );
};

export default StoryListing;
