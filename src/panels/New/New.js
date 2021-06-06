import React, { Component } from 'react';
import { ContentBlockSelector } from '../../components/ContentBlockSelector';
import './New.scss';

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
      <div className="New">
        <h3>Add Content Block</h3>
        <div className="New-ContentBlocks">
          {this.ContentBlocks.map((type, index) => {
            return(
              <ContentBlockSelector key={index} type={type} />
            )
          })}
        </div>
      </div>
    );
  }
}
