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

const DraftStory = ({ children }) => {
  return (
    <WorkspaceConsumer>
      {({ storyState }) => (
        <StoryPreview head={<FrameHead storyState={storyState} />}>
          <article>{children}</article>
        </StoryPreview>
      )}
    </WorkspaceConsumer>
  );
};

export default DraftStory;
