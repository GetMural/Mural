import React from 'react';
import styled from 'styled-components';
import Frame from 'react-styled-frame';

import { WorkspaceConsumer } from '../WorkspaceContext';
// eslint-disable-next-line import/no-webpack-loader-syntax
import draftCSS from '!!raw-loader!../client/styles.scss';
import {
  CentredTextDraft,
  ImageBackgroundDraft,
  ImageParallaxDraft,
} from './preview/';

const StoryPreview = styled(Frame)`
  width: 100%;
  height: 100vh;
`;

const StoryItems = {
  ImageBackgroundDraft,
  ImageParallaxDraft,
  CentredTextDraft,
};

const Preview = () => {
  return (
    <StoryPreview head={<style>{draftCSS}</style>}>
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
