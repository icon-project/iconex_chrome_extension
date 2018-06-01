import React, { Component } from 'react';
import { MyPageContainer } from 'app/containers/';

class MyPage extends Component {
  render() {
    return (
      <div>
        <div className="content-wrap lock">
          <MyPageContainer />
        </div>
        <div className="blank"></div>
      </div>
    );
  }
}

export default MyPage;
