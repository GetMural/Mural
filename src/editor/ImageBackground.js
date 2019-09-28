import React from 'react';
import {
  Form,
  FormGroup,
  Input,
  Fieldset,
  Label,
  FormText,
} from '@bootstrap-styled/v4';

import TitleField from './bites/TitleField';

const IMAGE_RENDITIONS = [
  {name: '16-9-1920', orientation: 'landscape', title: 'Rendition 16:9', suggestion: '1920 x 1080', thumbor: 'http://localhost:8888/unsafe/1920x1080'},
  {name: '4-3-1024', orientation: 'landscape', title: 'Rendition 4:3', suggestion: '1024 x 768', thumbor: 'http://localhost:8888/unsafe/1024x768'},
  {name: '9-16-1080', orientation: 'portrait', title: 'Rendition 9:16', suggestion: '1080 x 1920', thumbor: 'http://localhost:8888/unsafe/1080x1920'},
  {name: '3-4-768', orientation: 'portrait', title: 'Rendition 3:4', suggestion: '768 x 1024', thumbor: 'http://localhost:8888/unsafe/768x1024'}
];

const defaultJson = {
  image: '',
  audio: [
    // {mime: 'audio/mpeg', src: 'example.mp3'}
  ]
};

function uploadFile(e) {
  const file = e.target.files[0];
  console.log(file.name);
  console.log(file.path);
}

export default function ImageBackground() {
  return (
    <Form>
      <Fieldset><TitleField></TitleField></Fieldset>
      <Fieldset>
        <FormGroup color="success">
          <Label htmlFor="exampleEmail">Master Image</Label>
          <Input type="file" name="image" onChange={uploadFile}/>
          <FormText color="muted">Master Background Image</FormText>
        </FormGroup>
      </Fieldset>
    </Form>
  );
}; 