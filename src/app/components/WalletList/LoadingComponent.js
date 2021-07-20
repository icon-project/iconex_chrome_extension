import React, { Component } from 'react';

class LoadingComponent extends Component {
  render() {
    const { type } = this.props;
    return (
      <div className='loadingDiv'>
    		<div className={`loading ${type || ''}`}>
    		</div>
      </div>
    );
  }
}

export default LoadingComponent;
