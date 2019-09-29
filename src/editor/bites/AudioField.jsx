import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { Input, FormText } from '@bootstrap-styled/v4';
import Store from '../../store';

const mime = require('mime-types');
const { convertMediaToDataurl } = require('../../utils/dataurl');

const storage = new Store({ storyName: 'Test' });

class AudioField extends Component {
  constructor(props) {
    super(props);

    const { value } = this.props;

    this.state = {
      uploadPath: value,
    };

    this.createPath = this.createPath.bind(this);
  }

  createPath(e) {
    const file = e.target.files[0];
    const uploadPath = storage.importMedia(file.path, file.name);
    const mimeType = mime.lookup(uploadPath);
    this.setState({
      uploadPath,
      mimeType,
    });

    convertMediaToDataurl(uploadPath, mimeType).then((preview) => {
      this.setState({
        preview,
      });
    });
  }

  render() {
    const { onChange } = this.props;
    const { uploadPath, mimeType, preview } = this.state;

    return (
      <>
        <Input type="text" value={uploadPath} />
        <Input type="file" onChange={this.createPath} />
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio controls src={preview} />
        <FormText>{mimeType}</FormText>
      </>
    );
  }
}

AudioField.propTypes = {
  value: string,
  onChange: func,
};

AudioField.defaultProps = {
  value: '',
  onChange: null,
};

export default AudioField;
