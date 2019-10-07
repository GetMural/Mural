import React from 'react';
import { WorkspaceConsumer } from '../WorkspaceContext';
import Layout from './Layout';

import { loadStories } from '../FileManager';

const New = props => {
  const { history } = props;
  return (
    <WorkspaceConsumer>
      {({ onSelectStory }) => {
        return (
          <Layout>
            <div>
              Welcome to Mural!
              <ul>
                {loadStories().map(story => (
                  <li key={story}>
                    <button
                      onClick={() => {
                        onSelectStory(
                          story.substr(0, story.length - 5),
                        );
                        history.push('/story');
                      }}
                    >
                      {story}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Layout>
        );
      }}
    </WorkspaceConsumer>
  );
};

export default New;
