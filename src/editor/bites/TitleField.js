import React, { Component } from 'react';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
// import 'react-summernote/lang/summernote-ru-RU'; // you can import any other locale

// Import bootstrap(v3 or v4) dependencies
import 'bootstrap/js/src/modal';
import 'bootstrap/js/src/dropdown';
import 'bootstrap/js/src/tooltip';
import 'bootstrap/dist/css/bootstrap.css';

class TitleField extends Component {
  onChange(content) {
    console.log('onChange', content);
  }

  render() {
    return (
      <ReactSummernote
        value="Default value"
        options={{
          // lang: 'ru-RU',
          // height: 350,
          dialogsInBody: true,
          toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['color', ['color']]
          ]
        }}
        onChange={this.onChange}
      />
    );
  }
}

export default TitleField;