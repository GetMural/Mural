import React from 'react';
import {
  Form,
  FormGroup,
  Input,
  Fieldset,
  Legend,
  Label,
  FormText,
  Container,
} from '@bootstrap-styled/v4';

import BasicField from './bites/BasicField';
import RichTextField from './bites/RichTextField';
import AudioField from './bites/AudioField';
import BackgroundImageField from './bites/BackgroundImageField';
import NavEntry from './bites/NavEntry';

const IMAGE_RENDITIONS = [
  {
    name: '16-9-1920',
    orientation: 'landscape',
    title: 'Rendition 16:9',
    suggestion: '1920 x 1080',
    thumbor: 'http://localhost:8888/unsafe/1920x1080',
  },
  {
    name: '4-3-1024',
    orientation: 'landscape',
    title: 'Rendition 4:3',
    suggestion: '1024 x 768',
    thumbor: 'http://localhost:8888/unsafe/1024x768',
  },
  {
    name: '9-16-1080',
    orientation: 'portrait',
    title: 'Rendition 9:16',
    suggestion: '1080 x 1920',
    thumbor: 'http://localhost:8888/unsafe/1080x1920',
  },
  {
    name: '3-4-768',
    orientation: 'portrait',
    title: 'Rendition 3:4',
    suggestion: '768 x 1024',
    thumbor: 'http://localhost:8888/unsafe/768x1024',
  },
];

const defaultJson = {
  image: '',
  audio: [
    // {mime: 'audio/mpeg', src: 'example.mp3'}
  ],
};

function uploadFile(e) {
  const file = e.target.files[0];
  console.log(file.name);
  console.log(file.path);
}

function updateTitle(content) {
  console.log('onChange', content);
}

export default function ImageBackground() {
  return (
    <Container className="p-2">
      <Form>
        <NavEntry />
        <Fieldset>
          <Legend>Item Content</Legend>
          <FormGroup color="success">
            <Label>Title</Label>
            <BasicField onChange={updateTitle} value="Hello" />
          </FormGroup>
          <FormGroup color="success">
            <Label>Headline</Label>
            <BasicField onChange={updateTitle} value="Hello" />
          </FormGroup>
          <FormGroup color="success">
            <Label>Body</Label>
            <RichTextField onChange={updateTitle} value="Hello" />
          </FormGroup>
        </Fieldset>
        <Fieldset>
          <FormGroup color="success">
            <Label htmlFor="exampleEmail">Background Image</Label>
            <BackgroundImageField />
          </FormGroup>
        </Fieldset>
        <Fieldset>
          <Label>Audio</Label>
          <AudioField />
        </Fieldset>
      </Form>
    </Container>
  );
}
