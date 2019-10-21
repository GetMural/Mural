import React from 'react';
import { clone, applySnapshot, getSnapshot } from 'mobx-state-tree';
import { WorkspaceConsumer } from '../WorkspaceContext';

import ImageBackgroundForm from './ImageBackgroundForm';
import VideoBackgroundForm from './VideoBackgroundForm';
import ImageParallaxForm from './ImageParallaxForm';
import CentredTextForm from './CentredTextForm';
import HorizontalSlideshowForm from './HorizontalSlideshowForm';
import Layout from './Layout';
import FormLayout from './FormLayout';

const StoryForms = {
  ImageBackgroundForm,
  ImageParallaxForm,
  CentredTextForm,
  HorizontalSlideshowForm,
  VideoBackgroundForm,
};

const Editor = props => {
  const {
    match: {
      params: { itemNum },
    },
  } = props;

  const storyIndex = parseInt(itemNum, 10);

  return (
    <WorkspaceConsumer>
      {({ storyState }) => {
        const item = storyState.items[storyIndex];
        const clonedItem = clone(item);
        const Component = StoryForms[`${clonedItem.type}Form`];
        return (
          <Layout>
            <FormLayout draftItem={clonedItem}>
              <Component
                draftItem={clonedItem}
                onSave={() => {
                  applySnapshot(
                    storyState.items[storyIndex],
                    getSnapshot(clonedItem),
                  );
                }}
              />
            </FormLayout>
          </Layout>
        );
      }}
    </WorkspaceConsumer>
  );
};

export default Editor;
