import React from 'react';
import ReactDOM from 'react-dom';
import { store } from 'redux/store/store';
import { Provider } from 'react-redux';
import App from 'app-popup/App.js';
import { chromeStorage, isEmpty, openApp } from 'utils';

// style
import 'app/style/font.css';
import 'app-popup/style/preview.css';
import 'app-popup/style/preview-front.css';

chromeStorage.get(null, (data) => {
  const result = isEmpty(data) ? false : true
  if (!result) {
    openApp();
  } else {
    setTimeout(() => {
      ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>
      , document.getElementById('root-popup'));
    }, 250);
  }
});

//registerServiceWorker();
