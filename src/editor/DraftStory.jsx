import React from 'react';
import { observer } from 'mobx-react';
import Frame from 'react-styled-frame';
import styled from 'styled-components';
import { WorkspaceConsumer } from '../WorkspaceContext';

const StoryPreview = styled(Frame)`
  width: 100%;
  height: 100vh;
`;

const FrameHead = observer(({ storyState }) => {
  return <style>{storyState.storyStyles}</style>;
});

const FrameScript = observer(({ storyState }) => {
  return <script>{storyState.storyScript}</script>;
});

const DraftStory = ({ children }) => {
  return (
    <WorkspaceConsumer>
      {({ storyState }) => (
        <StoryPreview head={<FrameHead storyState={storyState} />}>
          <>
            <article id="scrollytelling">{children}</article>
            {/* <script
              src="https://code.jquery.com/jquery-3.4.1.min.js"
              integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
              crossorigin="anonymous"
            ></script> */}
            <FrameScript storyState={storyState} />
          </>
        </StoryPreview>
      )}
    </WorkspaceConsumer>
  );
};

export default DraftStory;
