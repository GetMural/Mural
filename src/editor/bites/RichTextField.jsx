import React from 'react';
import { string, func } from 'prop-types';
import Summernote from './Summernote';

function RichTextField({ onChange, value }) {
  return (
    <Summernote
      onChange={onChange}
      value={value}
      options={{
        toolbar: [
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['font', ['strikethrough', 'superscript', 'subscript']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['style', 'ul', 'ol', 'paragraph']],
          ['height', ['height']],
          ['tools', ['link', 'hr', 'codeview', 'undo', 'redo']],
        ],
      }}
    />
  );
}

RichTextField.propTypes = {
  value: string,
  onChange: func,
};

RichTextField.defaultProps = {
  value: '',
  onChange: null,
};

export default RichTextField;
