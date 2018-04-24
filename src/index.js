import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import App from './App.js';

// style
import './style/common.css';
import './style/common-font.css';
import './style/font.css';
import './style/common-front.css';

const proxyStore = new Store({
  portName: 'port'
});

proxyStore.ready().then(() => {
  ReactDOM.render(
    <Provider store={proxyStore}>
      <App />
    </Provider>
    , document.getElementById('root'));
});
//registerServiceWorker();
