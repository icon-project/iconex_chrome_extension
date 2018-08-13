import React, { Component } from 'react';
import { Route, Redirect, HashRouter } from 'react-router-dom';
import { HeaderContainer, PopupContainer, FooterContainer, TimerContainer } from 'app/containers';
import { Notice } from 'app/components';
import MainPage from 'app/pages/MainPage';
import MyWalletPage from 'app/pages/MyWalletPage';
import ExchangePage from 'app/pages/ExchangePage';
import TransactionPage from 'app/pages/TransactionPage';
import CoinDetailPage from 'app/pages/CoinDetailPage';
import ContractPage from 'app/pages/ContractPage';
import MyPage from 'app/pages/MyPage';
import LockPage from 'app/pages/LockPage';
import { routeConstants as ROUTE } from '../constants/index';
import { chromeStorage, chromeStorageLocal } from 'utils'

const HomeRoute = ({ component: Component, isLoggedIn, isLocked, ...rest }) => (
  <Route onEnter={window.scroll(0, 0)} exact {...rest} render={props => (
    !isLoggedIn ? (
      <Component {...props}/>
    ) : (
      isLocked
        ? (<Redirect to={ROUTE['lock']}/>)
        : (<Redirect to={ROUTE['mywallet']}/>)
    )
  )}/>
)

const PrivateRoute = ({ component: Component, isLoggedIn, isLocked, isLedgerAccess, ...rest }) => (
  <Route onEnter={window.scroll(0, 0)} {...rest} render={props => (
    isLoggedIn
      ? (
        isLocked
          ? (<Redirect to={ROUTE['lock']}/>)
          : (<Component {...props}/>)
        )
      : isLedgerAccess
          ? (<Component {...props}/>)
          : (<Redirect to={ROUTE['home']}/>)
  )}/>
)

const LoginRoute = ({ component: Component, isLoggedIn, isLocked, ...rest }) => (
  <Route onEnter={window.scroll(0, 0)} {...rest} render={props => (
    isLoggedIn ? (
      isLocked
        ? (<Component {...props}/>)
        : (<Redirect to={ROUTE['mywallet']}/>)
    ) : (
      <Redirect to={ROUTE['home']}/>
    )
  )}/>
)

class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showNotice: this.props.showNotice
    }
    this.tabId = ''
    this.mounted = false;
  }

  componentWillMount(){
    (async ()=>{
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
      window.chrome.runtime.sendMessage({ type: 'CHECK_APP_LOCK_STATE' });
    })();
  }

  componentDidMount() {
    window.chrome.tabs.getCurrent((tab) => {
      this.tabId = tab.id
      window.chrome.runtime.sendMessage({ type: 'ADD_TAB_ID', payload: tab.id });
    })
    window.chrome.extension.onMessage.addListener(message => {
      this.listenerHandler(message)
    })
  }

  componentWillUpdate() {
    window.scroll(0, 0);
  }

  listenerHandler = (message) => {
    const { type, payload } = message
    console.log(message)
    switch (type) {
      case 'REFRESH_LOCK_STATE_FULFILLED':
      console.log(payload, this.tabId)
        if (payload !== this.tabId) {
          window.chrome.tabs.reload(this.tabId)
        }
        break;
      case 'SET_LOCK_STATE':
        if (payload) {
          window.chrome.tabs.reload(this.tabId)
        } else {
          this.props.closePopup();
          this.props.setLockState(payload);
          this.props.getWallet();
        }
        break;
      case 'CHECK_APP_LOCK_STATE_FULFILLED':
        if (this.mounted) return;
        this.props.setLockState(payload);
        // if locked
        if (payload) {
          this.props.checkAuth();
        } else {
          this.props.checkAuth();
          this.props.getWallet();
        }
        this.mounted = true;
        break;
      default:
        break;
    }
  }

  toggleNotice = () => {
    this.setState({showNotice: !this.state.showNotice})
  }

  render() {
    const { initLoading, isLoggedIn, isLocked, isLedger, language } = this.props;
    const isShowNotice = (isLoggedIn && !isLocked) && this.state.showNotice
    return (
      <div className={`${navigator.platform.indexOf('Mac') > -1 ? 'isMac' : ''} empty`}>
      {
        !initLoading && (
          <HashRouter>
            <div className="empty">
              <div className={`
                  wrap
                  ${language}
                  ${(!isLoggedIn || isLocked) && !isLedger ? 'home' : ''}
                  ${isShowNotice ? 'notice' : ''}`}>
                {isShowNotice && <Notice toggleNotice={this.toggleNotice} {...this.props}/>}
                <HeaderContainer />
                <HomeRoute path={ROUTE['home']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={MainPage} />
                <PrivateRoute exact path={ROUTE['mywallet']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={MyWalletPage} />
                <PrivateRoute path={ROUTE['mywallet'] + "/:id"} isLoggedIn={isLoggedIn} isLocked={isLocked} component={CoinDetailPage} />
                <PrivateRoute path={ROUTE['exchange']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={ExchangePage} />
                <PrivateRoute path={ROUTE['transaction']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={TransactionPage} isLedgerAccess={isLedger}/>
                <PrivateRoute path={ROUTE['contract']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={ContractPage} />
                <PrivateRoute path={ROUTE['mypage']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={MyPage} />
                <LoginRoute path={ROUTE['lock']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={LockPage} />
              </div>
              <FooterContainer />
              <PopupContainer />
              <TimerContainer />
            </div>
          </HashRouter>
        )
      }
      </div>
    );
  }
}

export default Routes;
