import React, { Component } from 'react';
import { Route, Redirect, HashRouter } from 'react-router-dom';
import MyWalletPage from 'app-popup/pages/MyWalletPage';
import SendTransactionPage from 'app-popup/pages/SendTransactionPage';
import CheckTransactionPage from 'app-popup/pages/CheckTransactionPage';
import CompleteTransactionPage from 'app-popup/pages/CompleteTransactionPage';
import LockPage from 'app-popup/pages/LockPage';
import { routeConstants as ROUTE } from 'constants/index';
import { chromeStorage, chromeStorageLocal } from 'utils'
import queryString from 'query-string'

const PrivateRoute = ({ component: Component, isLocked, ...rest }) => (
  <Route exact {...rest} render={props => (
    isLocked
      ? (<Redirect to={ROUTE['lock']} />)
      : (<Component {...props} />)
  )} />
)

const LoginRoute = ({ component: Component, isLoggedIn, isLocked, ...rest }) => (
  <Route {...rest} render={props => (
    isLocked
      ? (<Component {...props} />)
      : (<Redirect to={ROUTE['home']} />)
  )} />
)

class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount() {
    (async () => {
      await new Promise(function (resolve, reject) {
        chromeStorageLocal.get(null, result => {
          chromeStorage.set(result, () => {
            Object.keys(result).map(key => {
              chromeStorageLocal.remove(key);
              return true;
            });
            resolve(true);
          })
        });
      });
      window.chrome.runtime.sendMessage({ type: 'CHECK_POPUP_LOCK_STATE' });
    })();
  }

  componentDidMount() {
    const message = queryString.parse(window.location.search)
    this.listenerHandler(message)
    window.chrome.extension.onMessage.addListener(message => {
      this.listenerHandler(message)
      window.focus()
    })
  }

  listenerHandler(message) {
    const { type } = message
    let { payload } = message
    payload = typeof payload === 'string' ? JSON.parse(payload) : payload
    switch (type) {
      case 'REQUEST_ADDRESS':
        this.props.setAddressRequest(payload)
        break;
      case 'REQUEST_SCORE':
        const { param } = payload
        if (param.method === 'icx_sendTransaction') {
          this.props.setScore(payload)
        }
        break;
      case 'REQUEST_SIGNING':
        this.props.setSigning(payload)
        break;
      case 'SET_LOCK_STATE':
        this.props.setLockState(message.payload);
        break;
      case 'CHECK_POPUP_LOCK_STATE_FULFILLED':
        this.props.setLockState(message.payload);
        this.props.checkAuth();
        this.props.getWallet();
        break;
      default:
    }
  }

  render() {
    const { initLoading, isLocked, language } = this.props;
    return (
      <div className={`${navigator.platform.indexOf('Mac') > -1 ? 'isMac' : ''} empty`}>
        {!initLoading && (
          <HashRouter>
            <div>
              <div className={`${language}`}>
                <PrivateRoute path={ROUTE['home']} isLocked={isLocked} component={MyWalletPage} />
                <PrivateRoute path={ROUTE['send']} isLocked={isLocked} component={SendTransactionPage} />
                <PrivateRoute path={ROUTE['check']} isLocked={isLocked} component={CheckTransactionPage} />
                <PrivateRoute path={ROUTE['complete']} isLocked={isLocked} component={CompleteTransactionPage} />
                <LoginRoute path={ROUTE['lock']} isLocked={isLocked} component={LockPage} />
              </div>
            </div>
          </HashRouter>
        )}
      </div>
    );
  }
}

export default Routes;
