import React, { Component } from 'react';
import { ExchangeTransactionPageContainer } from 'containers/';

class ExchangePage extends Component {
  render() {
    return (
      <div>
        <div className="content-wrap">
          <ExchangeTransactionPageContainer />
        </div>
        <div className="blank"></div>
      </div>
    );
  }
}

export default ExchangePage;
