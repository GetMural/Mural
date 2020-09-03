import React, { Component } from 'react';
import { string, func, shape, arrayOf } from 'prop-types';
import { observer } from 'mobx-react';
import { Label, FormGroup, Input } from '@bootstrap-styled/v4';

const mime = require('mime-types');

class MediaPreviewField extends Component {
  constructor(props) {
    super(props);
    this.createPath = this.createPath.bind(this);
    this.updatePath = this.updatePath.bind(this);
  }

  createPath(e) {
    const file = e.target.files[0];
    const {
      media: { uploadFile },
      acceptedMimeTypes,
    } = this.props;

    debugger;

    if (file && acceptedMimeTypes.includes(mime.lookup(file.path))) {
      uploadFile(file.path, file.name);
    }
  }

  updatePath(e) {
    const {
      media: { changePath, type },
    } = this.props;

    if (type === 'remote') {
      changePath(e.target.value);
    }
  }

  render() {
    const {
      media: { path, preview, type, changeType, changePath },
      children,
    } = this.props;

    const isLocal = type === 'local';

    return (
      <>
        <FormGroup check>
          <Label check>
            <Input
              type="radio"
              name="type"
              value="local"
              checked={type === 'local'}
              onChange={e => {
                changePath('');
                changeType('local');
              }}
            />{' '}
            Local
          </Label>
          <Label check>
            <Input
              type="radio"
              name="type"
              value="remote"
              checked={type === 'remote'}
              onChange={e => {
                changePath('');
                changeType('remote');
              }}
            />{' '}
            Remote
          </Label>
        </FormGroup>
        <Input
          type="text"
          value={path}
          readOnly={isLocal}
          onChange={this.updatePath}
        />
        {isLocal && <Input type="file" onChange={this.createPath} />}
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
