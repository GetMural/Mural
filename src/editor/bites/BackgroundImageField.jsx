import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { Input, FormText } from '@bootstrap-styled/v4';
import styled from 'styled-components';
import Store from '../../store';

const mime = require('mime-types');
const { convertMediaToDataurl } = require('../../utils/dataurl');

const ACCEPTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const storage = new Store({ storyName: 'Test' });

const Img = styled.img`
  max-width: 200px;
  max-height: 200px;
`;

class BackgroundImageField extends Component {
  constructor(props) {
    super(props);

    const { value } = this.props;
    const mimeType = mime.lookup(value);

    this.state = {
      mimeType,
      uploadPath: value,
    };

    this.createPath = this.createPath.bind(this);
    this.createPreview = this.createPreview.bind(this);

    this.createPreview();
  }

  createPreview() {
    const { uploadPath, mimeType } = this.state;
    convertMediaToDataurl(uploadPath, mimeType).then((preview) => {
      this.setState({
        preview,
      });
    });
  }

  createPath(e) {
    const file = e.target.files[0];
    const mimeType = mime.lookup(file.path);
    const { onUpdate } = this.props;

    if (ACCEPTED_MIME_TYPES.includes(mimeType)) {
      const uploadPath = storage.importMedia(file.path, file.name);
      this.setState(
        {
          uploadPath,
          mimeType,
        },
        this.createPreview,
      );
      onUpdate(uploadPath);
    }
  }

  render() {
    const { uploadPath, mimeType, preview } = this.state;

    return (
      <>
        <Input type="text" value={uploadPath} onChange={this.createPath} />
        <Input type="file" onChange={this.createPath} />
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <Img src={preview} alt="master img preview" />
        <FormText>{mimeType}</FormText>
        <FormText color="muted">Master Background Image</FormText>
      </>
    );
  }
}

BackgroundImageField.propTypes = {
  value: string,
  onUpdate: func,
};

BackgroundImageField.defaultProps = {
  value: '',
  onUpdate() {},
};

export default BackgroundImageField;
