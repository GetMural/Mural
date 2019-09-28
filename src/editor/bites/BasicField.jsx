import React from 'react';
import { string, func } from 'prop-types';
import Summernote from './Summernote';

function BasicField({ onChange, value }) {
  return (
    <Summernote
      onChange={onChange}
      value={value}
      options={{
        toolbar: [
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['font', ['strikethrough', 'superscript', 'subscript']],
          ['color', ['color']],
        ],
      }}
    />
  );
}

BasicField.propTypes = {
  value: string,
  onChange: func,
};

BasicField.defaultProps = {
  value: '',
  onChange: null,
};

export default BasicField;
