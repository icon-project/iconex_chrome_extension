import React, { Component } from 'react';
import { MainPageContainer } from 'app/containers/'
import { APP_VERSION } from 'constants/config.js'

class MainPage extends Component {
  render() {
    return (
      <div>
        <div>
          <MainPageContainer />
        </div>
        <div className="footer-wrap home">
          <span>©2018 ICON Foundation</span><span className="ver">{`Ver.${APP_VERSION}`}</span>
        </div>
      </div>
    );
  }
}

export default MainPage;
