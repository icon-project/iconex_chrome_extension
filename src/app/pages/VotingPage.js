import React, { Component } from 'react';
import { VotingPageContainer } from 'app/containers/';

class VotingPage extends Component {
  render() {
    return (
      <div>
        <div className="content-wrap vote">
          <VotingPageContainer />
        </div>
        <div className="blank"></div>
      </div>
    );
  }
}

export default VotingPage;
