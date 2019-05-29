import React, { Component } from 'react';
import { Preps, MyStatus, SubRoute } from 'app/components';

const INIT_STATE = {}

class VotingPage extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE
  }

  render() {
    return (
      <SubRoute
        title={'Voting'}
        labels={[
          'P-Rep', 
          'My Status'
        ]}
        components={[
          <Preps />, 
          <MyStatus />
        ]}
        tooltip={
          <h4 className="about-vote">
            <i className="_img info-no"></i>
            About Voting
          </h4>
        }
      />
    );
  }
}

export default VotingPage;
