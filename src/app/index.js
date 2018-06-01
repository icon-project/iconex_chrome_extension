import React from 'react';
import ReactDOM from 'react-dom';
import { store } from 'redux/store/store';
import { Provider } from 'react-redux';
// import { Store } from 'react-chrome-redux';
import App from 'app/App.js';

// style
import 'app/style/common.css';
import 'app/style/common-font.css';
import 'app/style/font.css';
import 'app/style/common-front.css';

// const proxyStore = new Store({
//   portName: 'port'
// });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));

//registerServiceWorker();
