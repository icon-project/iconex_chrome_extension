/* eslint-disable no-undef */
import React, { Component } from 'react';

const INIT_STATE = {

}

class LoadingComponentInline extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  render() {
    return (
      <div className='loadingDiv'>
    		<div className="loading">
          <svg width="31px"  height="31px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-facebook" style={{background: 'none'}}>
              <rect x="19" y="44" width="12" height="12" fill="#a0a0a0">
                <animate attributeName="y" calcMode="spline" values="35;44;44" keyTimes="0;0.5;1" dur="0.8" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.16000000000000003s" repeatCount="indefinite"></animate>
                <animate attributeName="height" calcMode="spline" values="30;12;12" keyTimes="0;0.5;1" dur="0.8" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.16000000000000003s" repeatCount="indefinite"></animate>
              </rect>
              <rect x="44" y="44" width="12" height="12" fill="#c2c2c2">
                <animate attributeName="y" calcMode="spline" values="37.25;44;44" keyTimes="0;0.5;1" dur="0.8" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.08000000000000002s" repeatCount="indefinite"></animate>
                <animate attributeName="height" calcMode="spline" values="25.5;12;12" keyTimes="0;0.5;1" dur="0.8" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.08000000000000002s" repeatCount="indefinite"></animate>
              </rect>
              <rect x="69" y="43.9948" width="12" height="12.0103" fill="#dedede">
                <animate attributeName="y" calcMode="spline" values="39.5;44;44" keyTimes="0;0.5;1" dur="0.8" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="0s" repeatCount="indefinite"></animate>
                <animate attributeName="height" calcMode="spline" values="21;12;12" keyTimes="0;0.5;1" dur="0.8" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="0s" repeatCount="indefinite"></animate>
              </rect>
            </svg>
    		</div>
      </div>
    );
  }
}

export default LoadingComponentInline;
