import React, { Component } from 'react';
import { CoinDetailContent, LoadingComponent } from 'app/components/';

const INIT_STATE = {
}

class CoinDetail extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  render() {
    if (this.props.walletsLoading) {
      return (
        <div className="page-loading-wrap">
          <LoadingComponent type="black" />
        </div>
      );
    }

    return (
      <div>
        <CoinDetailContent {...this.props} />
      </div>
    );
  }
}

export default CoinDetail;
