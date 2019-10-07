import React, { Component } from 'react';
import { WorkspaceConsumer } from '../WorkspaceContext';
import Layout from './Layout';

import { loadStories } from '../FileManager';

class New extends Component {
  state = {
    name: '',
  };

  selectStory = (name, onSelectStory) => {
    const { history } = this.props;
    onSelectStory(name);
    history.push('/story');
  };

  render() {
    return (
      <WorkspaceConsumer>
        {({ onSelectStory }) => {
          return (
            <Layout>
              <div>
                Welcome to Mural!
                <div>
                  <label htmlFor="new_story">New Story</label>
                  <input
                    onChange={e => {
                      this.setState({ name: e.target.value });
                    }}
                    id="new_story"
                    placeholder="Story Name"
                  ></input>
                  <button
                    onClick={() => {
                      this.selectStory(
                        this.state.name,
                        onSelectStory,
                      );
                    }}
                  >
                    Create
                  </button>
                </div>
                <ul>
                  {loadStories().map(story => (
                    <li key={story}>
                      <button
                        onClick={() => {
                          this.selectStory(
                            story.substr(0, story.length - 5),
                            onSelectStory,
                          );
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
  }
}

export default New;
