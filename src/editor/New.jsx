import React from 'react';
import { WorkspaceConsumer } from '../WorkspaceContext';
import Layout from './Layout';

const New = props => {
  const { history } = props;
  return (
    <WorkspaceConsumer>
      {({ onSelectStory }) => {
        return (
          <Layout>
            <div>
              Welcome to Mural!
              <button
                onClick={() => {
                  onSelectStory('Test');
                  history.push('/story');
                }}
              >
                Try Test.json
              </button>
            </div>
          </Layout>
        );
      }}
    </WorkspaceConsumer>
  );
};

export default New;
