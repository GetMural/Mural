import React, { Component } from 'react';
import Summernote from './Summernote';

class BasicField extends Component {

  render() {
    return (
      <Summernote
        onChange={this.props.onChange}
        value={this.props.value}
        options={{
          toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['color', ['color']]
          ]
        }}
      />
    );
  }
}

export default BasicField;