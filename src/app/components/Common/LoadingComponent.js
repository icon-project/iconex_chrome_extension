/* eslint-disable no-undef */
import React, { Component } from 'react';

const INIT_STATE = {

}

class LoadingComponent extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  render() {
    const { type, style } = this.props;
    return (
      <div className='loadingDiv' style={style}>
        <div className={`loading ${type || ''}`}>
        </div>
      </div>
    );
  }
}

export default LoadingComponent;
