import React, { Component } from 'react';
import { Web3Container } from 'app/containers/'
import RouteContainer from 'app-popup/containers/RouteContainer'
import queryString from 'query-string'

class App extends Component {
  componentWillMount() {
    const parsed = queryString.parse(window.location.search)
    if (parsed.context !== 'notification') {
      window.chrome.runtime.sendMessage({ type: 'CLOSE_POPUP' });
    }
  }

  componentWillUnmount() {
    window.chrome.runtime.sendMessage({ type: 'RESET_TIMER' });
  }

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
