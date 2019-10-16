import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Form, Container, Col, Row } from '@bootstrap-styled/v4';
import Frame from 'react-styled-frame';
import { WorkspaceConsumer } from '../WorkspaceContext';

import {
  CentredTextDraft,
  ImageBackgroundDraft,
  ImageParallaxDraft,
  HorizontalSlideshowDraft,
} from './preview/';

const DRAFTS = {
  CentredTextDraft,
  ImageBackgroundDraft,
  ImageParallaxDraft,
  HorizontalSlideshowDraft,
};

const StoryPreview = styled(Frame)`
  width: 100%;
  height: 100vh;
`;

const Editor = styled.div`
  overflow: auto;
  height: 100vh;
`;

function FormLayout({ draftItem, children }) {
  const Draft = DRAFTS[`${draftItem.type}Draft`];
  return (
    <WorkspaceConsumer>
      {({ storyState }) => (
        <Container className="m-0 p-0" fluid>
          <Row>
            <Col xs={8}>
              <Editor>
                <Form>{children}</Form>
              </Editor>
            </Col>
            <Col xs={4} className="p-0">
              <StoryPreview
                head={<style>{storyState.storyStyles}</style>}
              >
                <article>
                  <Draft item={draftItem}></Draft>
                </article>
              </StoryPreview>
            </Col>
          </Row>
        </Container>
      )}
    </WorkspaceConsumer>
  );
}

export default observer(FormLayout);
