/* eslint-disable no-undef */
import { createStore} from 'redux';
import rootReducer from 'backgroundRedux/reducers/rootReducer';
import {wrapStore} from 'react-chrome-redux';

const store = createStore(rootReducer, {});

wrapStore(store, {
  portName: 'port'
});

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({
        'url': chrome.extension.getURL('index.html')
    }, function(tab) {
    });
});
