import React from 'react';
import { Link } from 'react-router-dom';
import { WorkspaceConsumer } from '../WorkspaceContext';
import Layout from './Layout';

const StoryListing = props => {
  return (
    <WorkspaceConsumer>
      {({ storyState }) => {
        return (
          <Layout>
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
