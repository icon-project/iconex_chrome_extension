import React, { Component } from 'react';
import { RouteContainer, Web3Container } from 'containers/'
import { store } from 'redux/store/store';
import { Provider } from 'react-redux';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="empty">
          <Web3Container />
          <RouteContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
