import React from 'react';
import { Link } from 'react-router-dom';
import { H3 } from '@bootstrap-styled/v4';
import { WorkspaceConsumer } from '../WorkspaceContext';
import Layout from './Layout';
import { observer } from 'mobx-react';
import { StoryItem } from '../models/StoryModel';

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
            <ul>
              {storyState.items.map((storyItem, i) => (
                <li key={i}>
                  <Link to={`${i}`}>{storyItem.type}</Link>
                </li>
              ))}
            </ul>
          </Layout>
        );
      }}
    </WorkspaceConsumer>
  );
};

export default observer(StoryListing);
