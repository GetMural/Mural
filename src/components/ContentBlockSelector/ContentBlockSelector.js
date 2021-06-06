import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ContentBlockSelector.scss';

export class ContentBlockSelector extends Component {
  render() {
    return (
      <>
      {console.log(this.props)}
      <div className='ContentBlockSelector'>
          <div className={ this.props.type }>
          ContentBlockSelector
        </div>
      </div>
      </>
    );
  }
}

ContentBlockSelector.propTypes = {
  type: PropTypes.string.isRequired
}
