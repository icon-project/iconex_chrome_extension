import React, { Component } from 'react';
import {
  CoinDetailPageContainer
} from 'app/containers/';

class CoinDetailPage extends Component {
  render() {
    return (
      <div>
        <div className="content-wrap">
          <CoinDetailPageContainer {...this.props} />
        </div>
        <div className="blank"></div>
      </div>
    );
  }
}

export default CoinDetailPage;
