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

const FormContainer = styled.div`
  flex: 1;
`;

const Preview = styled.div`
  flex: 0 0 375px;
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
            <FormContainer>
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
            </FormContainer>
            <Preview>
              <Observer>
                {() => (
                  <DraftStory
                    draftStory={draftStory}
                    modified={draftStory.lastModified}
                    width="375px"
                  >
                    <DraftItem item={clonedItem}></DraftItem>
                  </DraftStory>
                )}
              </Observer>
            </Preview>
          </Layout>
        );
      }}
    </WorkspaceConsumer>
  );
};

export default Editor;
