import { connect } from 'react-redux';
import React, { Component } from 'react';
import { ETH_SERVER } from 'constants/config.js';
import Web3 from 'web3';

const INIT_STATE = {

}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

class Web3Component extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentWillMount() {
    this.getWeb3();
  }

  getWeb3 = () => {
    window.web3 = new Web3();
    window.web3.setProvider(new window.web3.providers.HttpProvider(ETH_SERVER));
  }

  render() {
    return (
      <div></div>
    );
  }
}

const Web3Container = connect(mapStateToProps, mapDispatchToProps)(Web3Component);

export default Web3Container;
