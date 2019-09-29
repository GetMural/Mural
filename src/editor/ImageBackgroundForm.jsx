import React from "react";
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
  Row
} from "@bootstrap-styled/v4";
import Store from "../store";

import BasicField from "./bites/BasicField";
import RichTextField from "./bites/RichTextField";
import AudioField from "./bites/AudioField";
import BackgroundImageField from "./bites/BackgroundImageField";
import NavEntry from "./bites/NavEntry";
import ImageBackground from "./preview/ImageBackground";

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

const defaultJson = {
  image: "",
  audio: [
    // {mime: 'audio/mpeg', src: 'example.mp3'}
  ]
};

const storage = new Store({ storyName: "Test" });
const item = storage.get("items")[0];

function updateTitle(content) {
  console.log("onChange", content);
}

export default function ImageBackgroundForm() {
  return (
    <Container>
      <Row>
        <Col xs="6">
          <Form>
            <NavEntry />
            <Fieldset>
              <Legend>Item Content</Legend>
              <FormGroup>
                <Label>Title</Label>
                <BasicField onChange={updateTitle} value={item.title} />
              </FormGroup>
              <FormGroup>
                <Label>Headline</Label>
                <BasicField onChange={updateTitle} value={item.subtitle} />
              </FormGroup>
              <FormGroup>
                <Label>Body</Label>
                <RichTextField onChange={updateTitle} value={item.body} />
              </FormGroup>
            </Fieldset>
            <Fieldset>
              <FormGroup>
                <Label>Background Image</Label>
                <BackgroundImageField
                  value={item.image}
                  onUpdate={path => {
                    console.log(path);
                  }}
                />
              </FormGroup>
            </Fieldset>
            <Fieldset>
              <Label>Audio</Label>
              <AudioField />
            </Fieldset>
          </Form>
        </Col>
        <Col xs="6">
          <ImageBackground
            title={item.title}
            subtitle={item.subtitle}
            body={item.body}
            image={item.image}
          />
        </Col>
      </Row>
    </Container>
  );
}
