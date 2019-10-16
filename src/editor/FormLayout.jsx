import React from 'react';
import styled from 'styled-components';
import { Form, Container, Col, Row } from '@bootstrap-styled/v4';
import DraftStory from './DraftStory';
import DraftItem from './DraftItem';

const Editor = styled.div`
  overflow: auto;
  height: 100vh;
`;

function FormLayout({ draftItem, children }) {
  return (
    <Container className="m-0 p-0" fluid>
      <Row>
        <Col xs={8}>
          <Editor>
            <Form>{children}</Form>
          </Editor>
        </Col>
        <Col xs={4} className="p-0">
          <DraftStory>
            <DraftItem item={draftItem}></DraftItem>
          </DraftStory>
        </Col>
      </Row>
    </Container>
  );
}

export default FormLayout;
