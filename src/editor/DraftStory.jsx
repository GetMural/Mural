import React from 'react';
import { observer } from 'mobx-react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { StyleSheetManager } from 'styled-components';

const FrameHead = observer(({ storyState }) => {
  return <style>{storyState.storyStyles}</style>;
});

let iFrameDoc;

function updateIFrame() {
  const script = iFrameDoc.createElement('script');
  script.type = 'text/javascript';
  script.text = `window.refresh();`;
  iFrameDoc.body.appendChild(script);
}

const DraftStory = ({ draftStory, children, width }) => {
  // TODO rework to look at all item JS
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
      <script type="text/javascript" src="/${draftStory.items[0].type}.js"></script>
    </body>
  </html>`;
  return (
    <Frame
      style={{
        display: 'block',
        overflow: 'scroll',
        border: 0,
        width,
        height: '100vh',
      }}
      initialContent={initialContent}
      mountTarget="#draft"
      head={<FrameHead storyState={draftStory} />}
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

          return (
            <StyleSheetManager target={document.head}>
              {<article id="scrollytelling">{children}</article>}
            </StyleSheetManager>
          );
        }}
      </FrameContextConsumer>
    </Frame>
  );
};

export default observer(DraftStory);
