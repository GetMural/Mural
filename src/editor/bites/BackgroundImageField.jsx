import React, { Component } from "react";
import { string, func } from "prop-types";
import { Input, FormText } from "@bootstrap-styled/v4";
import styled from "styled-components";
import Store from "../../store";

const mime = require("mime-types");
const { convertMediaToDataurl } = require("../../utils/dataurl");

const storage = new Store({ storyName: "Test" });

const Img = styled.img`
  max-width: 200px;
  max-height: 200px;
`;

class BackgroundImageField extends Component {
  constructor(props) {
    super(props);

    const { value } = this.props;

    this.state = {
      uploadPath: value
    };

    this.createPath = this.createPath.bind(this);
  }

  createPath(e) {
    const file = e.target.files[0];
    const uploadPath = storage.importMedia(file.path, file.name);
    const mimeType = mime.lookup(uploadPath);
    this.setState({
      uploadPath,
      mimeType
    });

    convertMediaToDataurl(uploadPath, mimeType).then(preview => {
      this.setState({
        preview
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
        <Img src={preview} alt="master img preview" />
        <FormText>{mimeType}</FormText>
        <FormText color="muted">Master Background Image</FormText>
      </>
    );
  }
}

BackgroundImageField.propTypes = {
  value: string,
  onChange: func
};

BackgroundImageField.defaultProps = {
  value: "",
  onChange: null
};

export default BackgroundImageField;
