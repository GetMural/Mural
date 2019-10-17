import React from 'react';
import { observer } from 'mobx-react';
import Frame from 'react-styled-frame';
import styled from 'styled-components';
import { WorkspaceConsumer } from '../WorkspaceContext';
const fs = require('fs');
const path = require('path');

const StoryPreview = styled(Frame)`
  width: 100%;
  height: 100vh;
`;

const FrameHead = observer(({ storyState }) => {
  return <style>{storyState.storyStyles}</style>;
});

// const FrameScript = observer(({ storyState }) => {
//   return <script>{storyState.storyScript}</script>;
// });

const DraftStory = ({ children }) => {
  const StoryJS = fs.readFileSync(
    '/Users/naaro/Code/Mural/public/story.js',
  );
  return (
    <WorkspaceConsumer>
      {({ storyState }) => (
        <StoryPreview
          initialContent={`<!DOCTYPE html><html><head></head><body><div id="mountHere"></div><script type="text/javascript">${StoryJS}</script></body></html>`}
          mountTarget="#mountHere"
          head={
            <>
              <FrameHead storyState={storyState} />
            </>
          }
        >
          <article id="scrollytelling">{children}</article>
        </StoryPreview>
      )}
    </WorkspaceConsumer>
  );
};

export default DraftStory;
