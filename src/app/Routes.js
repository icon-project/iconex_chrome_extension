import React, { Component } from 'react';
import { Route, Redirect, HashRouter } from 'react-router-dom';
import {
  HeaderContainer,
  PopupContainer,
  FooterContainer,
  TimerContainer,
  HomeContainer,
  LockContainer,
} from 'app/containers';
import { Notice } from 'app/components';
import MyWalletPage from 'app/pages/MyWalletPage';
import VotingPage from 'app/pages/VotingPage';
import ExchangePage from 'app/pages/ExchangePage';
import TransactionPage from 'app/pages/TransactionPage';
import CoinDetailPage from 'app/pages/CoinDetailPage';
import ContractPage from 'app/pages/ContractPage';
import MyPage from 'app/pages/MyPage';
import { routeConstants as ROUTE } from '../constants/index';
import { chromeStorage, chromeStorageLocal } from 'utils'

const HomeRoute = ({ component: Component, isLoggedIn, isLocked, ...rest }) => (
  <Route onEnter={window.scroll(0, 0)} exact {...rest} render={props => <Component {...props} />} />
)

const PrivateRoute = ({ component: Component, isLoggedIn, isLocked, isLedgerAccess, ...rest }) => (
  <Route onEnter={window.scroll(0, 0)} {...rest} render={props => (
    isLoggedIn
      ? (
        isLocked
          ? (<Redirect to={ROUTE['home']} />)
          : (<Component {...props} />)
      )
      : isLedgerAccess
        ? (<Component {...props} />)
        : (<Redirect to={ROUTE['home']} />)
  )} />
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
      window.chrome.runtime.sendMessage({ type: 'CHECK_APP_LOCK_STATE' });
    })();
  }

  componentDidMount() {
    const { showChangePasscode } = this.props
    window.chrome.tabs.getCurrent((tab) => {
      this.tabId = tab.id
      window.chrome.runtime.sendMessage({ type: 'ADD_TAB_ID', payload: tab.id });
    })
    window.chrome.extension.onMessage.addListener(message => {
      this.listenerHandler(message)
    })
    window.onpopstate = (e) => {
      // prevent triggered by a page load
      if (!showChangePasscode) {
        this.props.closePopup();
      }
    }
  }

  componentDidUpdate() {
    window.scroll(0, 0);
  }

  listenerHandler = (message) => {
    const { type, payload } = message
    switch (type) {
      case 'REFRESH_LOCK_STATE_FULFILLED':
        if (payload !== this.tabId) {
          window.scroll(0, 0);
          window.chrome.tabs.reload(this.tabId)
        }
        break;
      case 'SET_LOCK_STATE':
        window.scroll(0, 0);
        window.chrome.tabs.reload(this.tabId)
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
        break
      default:
        break;
    }
  }

  toggleNotice = () => {
    this.setState({ showNotice: !this.state.showNotice })
  }

  render() {
    const { initLoading, isLoggedIn, isLocked, isLedger, language } = this.props;
    const isShowNotice = isLoggedIn && this.state.showNotice
    return (
      <div className='empty'>
        {
          !initLoading && (
            <HashRouter>
              <div className='empty'>
                <div className={`wrap
                  ${language}
                  ${isShowNotice ? 'notice' : ''}`}>
                  {isShowNotice && <Notice toggleNotice={this.toggleNotice} {...this.props} />}
                  <HeaderContainer />
                  {/* <HomeRoute path={ROUTE['home']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={MainPage} /> */}
                  <HomeRoute exact path={ROUTE['home']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={MyWalletPage} />
                  <PrivateRoute path={ROUTE['mywallet'] + "/:id"} isLoggedIn={isLoggedIn} isLocked={isLocked} component={CoinDetailPage} />
                  <PrivateRoute path={ROUTE['voting']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={VotingPage} />
                  <PrivateRoute path={ROUTE['exchange']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={ExchangePage} />
                  <PrivateRoute path={ROUTE['transaction']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={TransactionPage} isLedgerAccess={isLedger} />
                  <PrivateRoute path={ROUTE['contract']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={ContractPage} />
                  <PrivateRoute path={ROUTE['mypage']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={MyPage} />
                </div>
                <FooterContainer />
                <div>
                  {!isLoggedIn && !isLedger && (<HomeContainer />)}
                  {isLocked && (<LockContainer />)}
                </div>
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
