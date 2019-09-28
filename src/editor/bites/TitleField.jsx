import React, { Component } from 'react';
import Summernote from './../Summernote';

class TitleField extends Component {
  onChange(content) {
    console.log('onChange', content);
  }

  render() {
    return (
      <Summernote
        onChange={this.onChange}
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

export default TitleField;