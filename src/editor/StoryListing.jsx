import React, { Component } from 'react';
import { H3, Select, Option } from '@bootstrap-styled/v4';
import { WorkspaceConsumer } from '../WorkspaceContext';
import Layout from './Layout';
import { StoryItem } from '../models/StoryModel';
import ItemList from './ItemList';

class StoryListing extends Component {
  state = {
    itemType: 'ImageBackground',
  };
  render() {
    return (
      <WorkspaceConsumer>
        {({ storyState, currentStory }) => {
          return (
            <Layout>
              <H3>Current Story: {currentStory}</H3>
              <div>
                <label htmlFor="new_story">New Item</label>
                <Select
                  onChange={e => {
                    this.setState({ itemType: e.target.value });
                  }}
                >
                  <Option value="ImageBackground">
                    ImageBackground
                  </Option>
                  <Option value="ImageParallax">ImageParallax</Option>
                </Select>
                <button
                  onClick={() => {
                    storyState.addItem(
                      StoryItem.create({ type: this.state.itemType }),
                    );
                  }}
                >
                  Add
                </button>
              </div>
              <ItemList items={storyState.items} />
            </Layout>
          );
        }}
      </WorkspaceConsumer>
    );
  }
}

export default StoryListing;
