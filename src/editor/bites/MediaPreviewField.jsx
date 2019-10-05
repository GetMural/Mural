import React, { Component } from 'react';
import {
 string, func, shape, arrayOf 
} from 'prop-types';
import { Input } from '@bootstrap-styled/v4';
import { observer } from 'mobx-react';

const mime = require('mime-types');

class MediaPreviewField extends Component {
  constructor(props) {
    super(props);
    this.createPath = this.createPath.bind(this);
  }

  createPath(e) {
    const file = e.target.files[0];
    const { onUpdate, acceptedMimeTypes } = this.props;

    if (file && acceptedMimeTypes.includes(mime.lookup(file.path))) {
      onUpdate(file.path, file.name);
    }
  }

  render() {
    const {
      media: { path, preview },
      children,
    } = this.props;

    return (
      <>
        <Input type="text" value={path} readOnly />
        <Input type="file" onChange={this.createPath} />
        {children({
          preview,
        })}
      </>
    );
  }
}

MediaPreviewField.propTypes = {
  media: shape({
    path: string,
    preview: string,
  }),
  acceptedMimeTypes: arrayOf(string),
  onUpdate: func,
  children: func,
};

MediaPreviewField.defaultProps = {
  media: {
    path: '',
    preview: '',
  },
  acceptedMimeTypes: [],
  onUpdate() {},
  children() {},
};

export default observer(MediaPreviewField);
