import React, { Component } from 'react';
import { LockPageContainer } from 'containers/'
import { APP_VERSION } from 'constants/config.js'

class LockPage extends Component {
  render() {
    return (
      <div>
        <div className='content-wrap lock'>
          <LockPageContainer />
        </div>
        <div className="footer-wrap home">
          <span>©2018 ICON Foundation</span><span className="ver">{`Ver.${APP_VERSION}`}</span>
        </div>
      </div>
    );
  }
}

export default LockPage;
