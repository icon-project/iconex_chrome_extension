import React, { Component } from 'react';
import { LoadingComponent } from 'app/components/';
import { ContractSearchSectionContainer, ContractRunSectionContainer } from 'app/containers/'

const INIT_STATE = {

}

class ContractReadPage extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  render() {

    if (this.props.walletsLoading) {
      return (
        <div className="wrap-holder contract">
          <div className="page-loading-wrap">
            <LoadingComponent type="black" />
          </div>
        </div>
      );
    }

    return (
      <div className="wrap-holder contract">
        <ContractSearchSectionContainer />
        <ContractRunSectionContainer />
      </div>
    );
  }
}

export default ContractReadPage;
