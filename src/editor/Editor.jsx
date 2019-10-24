import React from 'react';
import styled from 'styled-components';
import { clone, applySnapshot, getSnapshot } from 'mobx-state-tree';
import { Observer } from 'mobx-react';
import { WorkspaceConsumer } from '../WorkspaceContext';

import ImageBackgroundForm from './ImageBackgroundForm';
import VideoBackgroundForm from './VideoBackgroundForm';
import ImageParallaxForm from './ImageParallaxForm';
import CentredTextForm from './CentredTextForm';
import HorizontalSlideshowForm from './HorizontalSlideshowForm';
import Layout from './Layout';
import { Form } from '@bootstrap-styled/v4';
import DraftStory from './DraftStory';
import DraftItem from './DraftItem';

const StoryForms = {
  ImageBackgroundForm,
  ImageParallaxForm,
  CentredTextForm,
  HorizontalSlideshowForm,
  VideoBackgroundForm,
};

const FormEditor = styled.div`
  overflow: auto;
  height: 100vh;
`;

const Editor = props => {
  const {
    match: {
      params: { itemNum },
    },
  } = props;

  const storyIndex = parseInt(itemNum, 10);

  return (
    <WorkspaceConsumer>
      {({ storyState, createDraftStory, currentStory }) => {
        const draftStory = createDraftStory(currentStory);
        const item = storyState.items[storyIndex];
        const clonedItem = clone(item, false);
        draftStory.addItem(clonedItem);
        const Component = StoryForms[`${clonedItem.type}Form`];
        return (
          <Layout>
            <div className="flex-fill">
              <FormEditor>
                <Form>
                  <Component
                    draftItem={clonedItem}
                    onSave={() => {
                      applySnapshot(
                        storyState.items[storyIndex],
                        getSnapshot(clonedItem),
                      );
                    }}
                  />
                </Form>
              </FormEditor>
            </div>
            <div className="col-xs-auto">
              <Observer>
                {() => (
                  <DraftStory
                    draftStory={draftStory}
                    modified={draftStory.lastModified}
                  >
                    <DraftItem item={clonedItem}></DraftItem>
                  </DraftStory>
                )}
              </Observer>
            </div>
          </Layout>
        );
      }}
    </WorkspaceConsumer>
  );
};

export default Editor;
