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
import { StoryItem } from '../models/StoryTree';

import BasicField from './bites/BasicField';
import RichTextField from './bites/RichTextField';
import AudioField from './bites/AudioField';
import BackgroundImageField from './bites/BackgroundImageField';
import NavEntry from './bites/NavEntry';
import ImageBackground from './preview/ImageBackground';

// const IMAGE_RENDITIONS = [
//   {
//     name: "16-9-1920",
//     orientation: "landscape",
//     title: "Rendition 16:9",
//     suggestion: "1920 x 1080",
//     thumbor: "http://localhost:8888/unsafe/1920x1080"
//   },
//   {
//     name: "4-3-1024",
//     orientation: "landscape",
//     title: "Rendition 4:3",
//     suggestion: "1024 x 768",
//     thumbor: "http://localhost:8888/unsafe/1024x768"
//   },
//   {
//     name: "9-16-1080",
//     orientation: "portrait",
//     title: "Rendition 9:16",
//     suggestion: "1080 x 1920",
//     thumbor: "http://localhost:8888/unsafe/1080x1920"
//   },
//   {
//     name: "3-4-768",
//     orientation: "portrait",
//     title: "Rendition 3:4",
//     suggestion: "768 x 1024",
//     thumbor: "http://localhost:8888/unsafe/768x1024"
//   }
// ];

const storage = new Store({ storyName: 'Test' });
const item = storage.get('items')[0];

const draftItem = StoryItem.create(item);
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
                  value={draftItem.image}
                  onUpdate={(path) => {
                    draftItem.image = path;
                  }}
                />
              </FormGroup>
            </Fieldset>
            <Fieldset>
              <Label>Audio</Label>
              <AudioField
                value={draftItem.audio}
                onUpdate={(path) => {
                  draftItem.audio = path;
                }}
              />
            </Fieldset>
          </Form>
        </Col>
        <Col xs="6">
          <ImageBackground item={draftItem} />
        </Col>
      </Row>
    </Container>
  );
}
