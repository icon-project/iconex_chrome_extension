import React, { Component } from 'react';
import { Graph, MyWalletHeaderLeft, LoadingComponent } from 'components/'

const INIT_STATE = {

}

class MyWalletHeader extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  render() {
    return (
        <div className="main-holder">
        {!this.props.totalResultLoading ? (
          <div className="info-holder">
            <MyWalletHeaderLeft {...this.props} />
            <Graph {...this.props} />
          </div>
        ) : (
          <div className="load">
            <LoadingComponent />
          </div>
        )}
        </div>
    );
  }
}

export default MyWalletHeader;
