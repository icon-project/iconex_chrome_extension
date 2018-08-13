import React, { Component } from 'react';
import { ContractPageContainer } from 'app/containers/';

class ContractPage extends Component {
  render() {
    return (
      <div>
        <div className="content-wrap">
          <ContractPageContainer />
        </div>
        <div className="blank"></div>
      </div>
    );
  }
}

export default ContractPage;
