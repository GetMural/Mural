import React from 'react';
import { unprotect } from 'mobx-state-tree';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import {
  Form,
  FormGroup,
  Input,
  Fieldset,
  Legend,
  Label,
  FormText,
  Container,
  Col,
  Row,
} from '@bootstrap-styled/v4';
import Frame from 'react-styled-frame';
import Store from '../store';
import { ImageBackgroundDraft as Draft } from '../models/StoryTree';

// eslint-disable-next-line import/no-webpack-loader-syntax
import draftCSS from '!!raw-loader!../client/styles.scss';

import BasicField from './bites/BasicField';
import RichTextField from './bites/RichTextField';
import AudioField from './bites/AudioField';
import BackgroundImageField from './bites/BackgroundImageField';
import NavEntry from './bites/NavEntry';
import ImageBackgroundDraft from './preview/ImageBackgroundDraft';

const Img = styled.img`
  max-width: 200px;
  max-height: 200px;
`;

const StoryPreview = styled(Frame)`
  width: 100%;
  height: 100vh;
`;

const Editor = styled.div`
  overflow: auto;
  height: 100vh;
`;

const storage = new Store({ storyName: 'Test' });
const item = storage.get('items')[0];

const draftItem = Draft.create(item);
unprotect(draftItem);

function ImageBackgroundForm(props) {
  const {
    config: {
      editor: { previewWidth },
    },
  } = props;
  return (
    <Container className="m-0 p-0" fluid>
      <Row>
        <Col xs={12 - previewWidth}>
          <Editor>
            <Form>
              <NavEntry />
              <Fieldset>
                <Legend>Item Content</Legend>
                <FormGroup>
                  <Label>Title</Label>
                  <BasicField
                    onChange={(content) => {
                      draftItem.title = content;
                    }}
                    value={draftItem.title}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Headline</Label>
                  <BasicField
                    onChange={(content) => {
                      draftItem.subtitle = content;
                    }}
                    value={draftItem.subtitle}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Body</Label>
                  <RichTextField
                    onChange={(content) => {
                      draftItem.body = content;
                    }}
                    value={draftItem.body}
                  />
                </FormGroup>
              </Fieldset>
              <Fieldset>
                <FormGroup>
                  <Label>Background Image</Label>
                  <BackgroundImageField
                    image={draftItem.image}
                    onUpdate={(path) => {
                      draftItem.image.path = path;
                    }}
                  />
                  {draftItem.image.renditions.map((rendition) => (
                    <div
                      key={`${rendition.w}x${rendition.h}x${rendition.scale}`}
                    >
                      <div>{`${rendition.w}x${rendition.h} scale ${rendition.scale}`}</div>
                      <Img
                        src={rendition.thumborUrl}
                        alt={`${rendition.w}x${rendition.h}`}
                      />
                    </div>
                  ))}
                </FormGroup>
              </Fieldset>
              <Fieldset>
                <Label>Audio</Label>
                {/* <AudioField
                value={draftItem.audio}
                onUpdate={(path) => {
                  draftItem.audio = path;
                }}
              /> */}
              </Fieldset>
            </Form>
          </Editor>
        </Col>
        <Col xs={previewWidth} className="p-0">
          <StoryPreview head={<style>{draftCSS}</style>}>
            <>
              <article>
                <ImageBackgroundDraft item={draftItem} />
              </article>
            </>
          </StoryPreview>
        </Col>
      </Row>
    </Container>
  );
}

export default observer(ImageBackgroundForm);
