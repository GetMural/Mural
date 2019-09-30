import React, { Component } from 'react';
import { string, func, shape } from 'prop-types';
import { Input, FormText } from '@bootstrap-styled/v4';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Store from '../../store';

const storage = new Store({ storyName: 'Test' });

const Img = styled.img`
  max-width: 200px;
  max-height: 200px;
`;

class BackgroundImageField extends Component {
  constructor(props) {
    super(props);
    this.createPath = this.createPath.bind(this);
  }

  createPath(e) {
    const file = e.target.files[0];
    const { onUpdate } = this.props;

    const uploadPath = storage.importMedia(file.path, file.name);
    onUpdate(uploadPath);
  }

  render() {
    const {
      image: { path, preview },
    } = this.props;

    return (
      <>
        <Input type="text" value={path} onChange={this.createPath} />
        <Input type="file" onChange={this.createPath} />
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <Img src={preview} alt="master img preview" />
        <FormText color="muted">Master Background Image</FormText>
      </>
    );
  }
}

BackgroundImageField.propTypes = {
  image: shape({
    path: string,
    preview: string,
  }),
  onUpdate: func,
};

BackgroundImageField.defaultProps = {
  image: {
    path: '',
    preview: '',
  },
  onUpdate() {},
};

export default observer(BackgroundImageField);
