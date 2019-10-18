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

const initialContent = `
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <div id="draft"></div>
    <script type="text/javascript" src="/HorizontalSlideshow.js"></script>
  </body>
</html>`;

const DraftStory = ({ children }) => {
  return (
    <WorkspaceConsumer>
      {({ storyState }) => (
        <StoryPreview
          initialContent={initialContent}
          mountTarget="#draft"
          head={<FrameHead storyState={storyState} />}
        >
          <article id="scrollytelling">{children}</article>
        </StoryPreview>
      )}
    </WorkspaceConsumer>
  );
};

export default DraftStory;
