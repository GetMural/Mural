import React, { Component } from 'react';
import {
  H3,
  Select,
  Option,
  Label,
  Button,
  FormGroup,
  Form,
  Container,
} from '@bootstrap-styled/v4';
import { observer } from 'mobx-react';
import { WorkspaceConsumer } from '../WorkspaceContext';
import Layout from './Layout';
import {
  ImageBackground,
  ImageParallax,
  CentredText,
  HorizontalSlideshow,
} from '../models/StoryModel';
import ItemList from './ItemList';

const ITEMS = {
  ImageBackground,
  ImageParallax,
  CentredText,
  HorizontalSlideshow,
};

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
              <Container>
                <H3>Current Story: {currentStory}</H3>
                <Form className="form-inline">
                  <FormGroup className="mr-2">
                    <Label htmlFor="new_story" className="sr-only">
                      New Item
                    </Label>
                    <Select
                      className="form-control"
                      onChange={e => {
                        this.setState({ itemType: e.target.value });
                      }}
                    >
                      {Object.keys(ITEMS).map(storyItem => (
                        <Option key={storyItem} value={storyItem}>
                          {storyItem}
                        </Option>
                      ))}
                    </Select>
                  </FormGroup>
                  <Button
                    onClick={() => {
                      storyState.addItem(
                        ITEMS[this.state.itemType].create({
                          type: this.state.itemType,
                        }),
                      );
                    }}
                  >
                    Add
                  </Button>
                </Form>
                <ItemList items={storyState.items} />
              </Container>
            </Layout>
          );
        }}
      </WorkspaceConsumer>
    );
  }
}

export default observer(StoryListing);
