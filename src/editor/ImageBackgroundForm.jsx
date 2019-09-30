import React from 'react';
import { unprotect } from 'mobx-state-tree';
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
import Store from '../store';
import { ImageBackgroundDraft as Draft } from '../models/StoryTree';

import BasicField from './bites/BasicField';
import RichTextField from './bites/RichTextField';
import AudioField from './bites/AudioField';
import BackgroundImageField from './bites/BackgroundImageField';
import NavEntry from './bites/NavEntry';
import ImageBackgroundDraft from './preview/ImageBackgroundDraft';

const storage = new Store({ storyName: 'Test' });
const item = storage.get('items')[0];

const draftItem = Draft.create(item);
unprotect(draftItem);

export default function ImageBackgroundForm() {
  return (
    <Container className="m-1" fluid>
      <Row>
        <Col xs="6">
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
        </Col>
        <Col xs="6">
          <ImageBackgroundDraft item={draftItem} />
        </Col>
      </Row>
    </Container>
  );
}
