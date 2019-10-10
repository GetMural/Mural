import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import {
  Form,
  Fieldset,
  Legend,
  Container,
  Col,
  Row,
  Button,
  ButtonGroup,
} from '@bootstrap-styled/v4';
import Frame from 'react-styled-frame';

// eslint-disable-next-line import/no-webpack-loader-syntax
import draftCSS from '!!raw-loader!../client/styles.scss';

import { Title, Subtitle, Body, NavEntry } from './bites';
import CentredTextDraft from './preview/CentredTextDraft';

const StoryPreview = styled(Frame)`
  width: 100%;
  height: 100vh;
`;

const Editor = styled.div`
  overflow: auto;
  height: 100vh;
`;

function CentredTextForm(props) {
  const { draftItem, onSave } = props;
  return (
    <Container className="m-0 p-0" fluid>
      <Row>
        <Col xs={8}>
          <Editor>
            <Form>
              <NavEntry />
              <Fieldset>
                <Legend>Item Content</Legend>
                <Title
                  title={draftItem.title}
                  changeTitle={draftItem.changeTitle}
                />
                <Subtitle
                  subtitle={draftItem.subtitle}
                  changeSubtitle={draftItem.changeSubtitle}
                />
                <Body
                  body={draftItem.body}
                  changeBody={draftItem.changeBody}
                />
              </Fieldset>
              <ButtonGroup>
                <Button color="secondary">Cancel</Button>
                <Button color="secondary">Reset</Button>
                <Button color="primary" onClick={onSave}>
                  Save
                </Button>
              </ButtonGroup>
            </Form>
          </Editor>
        </Col>
        <Col xs={4} className="p-0">
          <StoryPreview head={<style>{draftCSS}</style>}>
            <article>
              <CentredTextDraft item={draftItem} />
            </article>
          </StoryPreview>
        </Col>
      </Row>
    </Container>
  );
}

export default observer(CentredTextForm);
