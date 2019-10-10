import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Form, Container, Col, Row } from '@bootstrap-styled/v4';
import Frame from 'react-styled-frame';

// eslint-disable-next-line import/no-webpack-loader-syntax
import draftCSS from '!!raw-loader!../client/styles.scss';
import {
  CentredTextDraft,
  ImageBackgroundDraft,
  ImageParallaxDraft,
} from './preview/';

const DRAFTS = {
  CentredTextDraft,
  ImageBackgroundDraft,
  ImageParallaxDraft,
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
    <Container className="m-0 p-0" fluid>
      <Row>
        <Col xs={8}>
          <Editor>
            <Form>{children}</Form>
          </Editor>
        </Col>
        <Col xs={4} className="p-0">
          <StoryPreview head={<style>{draftCSS}</style>}>
            <article>
              <Draft item={draftItem}></Draft>
            </article>
          </StoryPreview>
        </Col>
      </Row>
    </Container>
  );
}

export default observer(FormLayout);
