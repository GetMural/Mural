import React from 'react';
import { observer } from 'mobx-react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { StyleSheetManager } from 'styled-components';
import { WorkspaceConsumer } from '../WorkspaceContext';

const FrameHead = observer(({ storyState }) => {
  return <style>{storyState.storyStyles}</style>;
});

const initialContent = `
<!DOCTYPE html>
<html>
  <head>
    <style>@import url('https://fonts.googleapis.com/css?family=Roboto+Slab:400,300,700');</style>
  </head>
  <body>
    <div id="draft"></div>
    <script
      src="https://code.jquery.com/jquery-3.4.1.min.js"
      integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
      crossorigin="anonymous"></script>
    <script type="text/javascript" src="/HorizontalSlideshow.js"></script>
  </body>
</html>`;

let iFrameDoc;

function updateIFrame() {
  const script = iFrameDoc.createElement('script');
  script.type = 'text/javascript';
  script.text = `window.refresh();`;
  iFrameDoc.body.appendChild(script);
}

const DraftStory = ({ children }) => {
  return (
    <WorkspaceConsumer>
      {({ storyState }) => (
        <Frame
          style={{
            display: 'block',
            overflow: 'scroll',
            border: 0,
            width: '100%',
            height: '100vh',
          }}
          initialContent={initialContent}
          mountTarget="#draft"
          head={<FrameHead storyState={storyState} />}
          contentDidMount={() => {
            console.log('mounted');
          }}
          contentDidUpdate={() => {
            console.log('updated');
            updateIFrame();
          }}
        >
          <FrameContextConsumer>
            {({ document, window }) => {
              iFrameDoc = document;
              // const script = document.createElement('script');
              // script.type = 'text/javascript';
              // script.text = 'console.log("HELLO FRAME")';
              // document.body.appendChild(script);
              // window.addEventListener('load', function(event) {
              //   console.log('WINDOW LOADED');
              // });
              // window.addEventListener('beforeunload', function(
              //   event,
              // ) {
              //   console.log('WINDOW UNLOADED');
              // });
              return (
                <StyleSheetManager target={document.head}>
                  {<article id="scrollytelling">{children}</article>}
                </StyleSheetManager>
              );
            }}
          </FrameContextConsumer>
        </Frame>
      )}
    </WorkspaceConsumer>
  );
};

export default observer(DraftStory);
