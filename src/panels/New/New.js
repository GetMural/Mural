import React, { Component } from 'react';
import { ContentBlockSelector } from '../../components/ContentBlockSelector';

export class New extends Component {
  constructor() {
    super()
    this.ContentBlocks = [
      "BackgroundVideo",
      "CentredText",
      "FullpageVideo",
      "HorizontalSlideshow",
      "ImageAudio",
      "ImageBackground",
      "ImageParallax",
      "VerticalSlideshow",
      "YouTube",
    ]
  }
  render() {
    return (
      <>
        <h3>Add Content Block</h3>
        {this.ContentBlocks.map((type, index) => {
          return(
            <ContentBlockSelector key={index} type={type} />
          )
        })}
      </>
    );
  }
}
