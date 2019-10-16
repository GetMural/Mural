import React from 'react';
import styled from 'styled-components';
import Frame from 'react-styled-frame';

import { WorkspaceConsumer } from '../WorkspaceContext';
import {
  CentredTextDraft,
  ImageBackgroundDraft,
  ImageParallaxDraft,
  HorizontalSlideshowDraft,
} from './preview/';

const StoryPreview = styled(Frame)`
  width: 100%;
  height: 100vh;
`;

const StoryItems = {
  ImageBackgroundDraft,
  ImageParallaxDraft,
  CentredTextDraft,
  HorizontalSlideshowDraft,
};

const Preview = () => {
  return (
    <StoryPreview head={<style></style>}>
      <article>
        <WorkspaceConsumer>
          {({ storyState }) =>
            storyState.items.map((storyItem, i) => {
              const Component = StoryItems[`${storyItem.type}Draft`];
              return <Component key={i} item={storyItem}></Component>;
            })
          }
        </WorkspaceConsumer>
      </article>
    </StoryPreview>
  );
};

export default Preview;
