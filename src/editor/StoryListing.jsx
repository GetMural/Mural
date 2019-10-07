import React from 'react';
import { Link } from 'react-router-dom';
import { H3 } from '@bootstrap-styled/v4';
import { WorkspaceConsumer } from '../WorkspaceContext';
import Layout from './Layout';

const StoryListing = props => {
  return (
    <WorkspaceConsumer>
      {({ storyState, currentStory }) => {
        return (
          <Layout>
            <H3>Current Story: {currentStory}</H3>
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

export default StoryListing;
