import React, { Component } from 'react';
import { RouteContainer, Web3Container } from 'app/containers/'

class App extends Component {

  render() {
    return (
      <div>
        <Web3Container />
        <RouteContainer />
      </div>
    );
  }
}

export default App;
