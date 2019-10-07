import React from 'react';
import { WorkspaceConsumer } from '../WorkspaceContext';

import ImageBackgroundDraft from './preview/ImageBackgroundDraft';
import ImageParallaxDraft from './preview/ImageParallaxDraft';

import styled from 'styled-components';
import Frame from 'react-styled-frame';

// eslint-disable-next-line import/no-webpack-loader-syntax
import draftCSS from '!!raw-loader!../client/styles.scss';

const StoryPreview = styled(Frame)`
  width: 100%;
  height: 100vh;
`;

const StoryItems = {
  ImageBackground: ImageBackgroundDraft,
  ImageParallax: ImageParallaxDraft,
};

const Preview = () => {
  return (
    <StoryPreview head={<style>{draftCSS}</style>}>
      <article>
        <WorkspaceConsumer>
          {({ storyState }) =>
            storyState.items.map((storyItem, i) => {
              const Component = StoryItems[storyItem.type];
              return <Component key={i} item={storyItem}></Component>;
            })
          }
        </WorkspaceConsumer>
      </article>
    </StoryPreview>
  );
};

export default Preview;
