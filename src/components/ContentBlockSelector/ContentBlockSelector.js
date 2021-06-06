import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ContentBlockSelector.scss';

export class ContentBlockSelector extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    console.log(e.currentTarget);
  }
  render() {
    return (
      <>
      {console.log(this.props)}
      <div className='ContentBlockSelector'>
          <div className={ this.props.type }
                onClick={(e) => this.handleClick(e)}>
          {this.props.type}
        </div>
      </div>
      </>
    );
  }
}

ContentBlockSelector.propTypes = {
  type: PropTypes.string.isRequired
}
