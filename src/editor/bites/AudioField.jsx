import React, { Component } from 'react';
import { string, func } from 'prop-types';
import {
  Form,
  FormGroup,
  Input,
  Fieldset,
  Label,
  FormText,
} from '@bootstrap-styled/v4';
import Store from './../../store';
const mime = require('mime-types');
const dataurl = require('dataurl');
const fs = require('fs');

const storage = new Store({ storyName: 'Test' });

const convertSong = (filePath) => {
  const songPromise = new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) { reject(err); }
      resolve(dataurl.convert({ data, mimetype: mime.lookup(filePath) }));
    });
  });
  return songPromise;
};


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
    this.setState({
      uploadPath,
    });

    convertSong(uploadPath).then((preview) => {
      this.setState({
        preview,
      });
    })
  }

  render() {
    const { onChange } = this.props;
    const { uploadPath, preview } = this.state;

    return (
      <>
        <Input type="text" value={uploadPath} />
        <Input type="file" onChange={this.createPath} />
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio controls src={preview} />
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
