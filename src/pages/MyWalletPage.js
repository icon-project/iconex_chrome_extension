import React, { Component } from 'react';
import {
  MyWalletPageContainer
} from 'containers/';

class MyWalletPage extends Component {
  render() {
    return (
      <div>
        <div className="content-wrap main">
          <MyWalletPageContainer />
        </div>
        <div className="blank"></div>
      </div>
    );
  }
}

export default MyWalletPage;
