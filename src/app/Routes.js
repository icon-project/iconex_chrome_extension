import React, { Component } from 'react';
import { Route, Redirect, HashRouter } from 'react-router-dom';
import { HeaderContainer, PopupContainer, FooterContainer } from 'app/containers';
import { Notice } from 'app/components';
import MainPage from 'app/pages/MainPage';
import MyWalletPage from 'app/pages/MyWalletPage';
import ExchangePage from 'app/pages/ExchangePage';
import TransactionPage from 'app/pages/TransactionPage';
import CoinDetailPage from 'app/pages/CoinDetailPage';
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

const PrivateRoute = ({ component: Component, isLoggedIn, isLocked, ...rest }) => (
  <Route onEnter={window.scroll(0, 0)} {...rest} render={props => (
    isLoggedIn ? (
      isLocked
        ? (<Redirect to={ROUTE['lock']}/>)
        : (<Component {...props}/>)
    ) : (
      <Redirect to={ROUTE['home']}/>
    )
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
      if (!this.props.isAppOpenedByPopup) {
        this.props.checkIsLocked(this.props.passcodeHash ? true : false);
      }
      this.props.setIsAppOpenedByPopup(false);
      this.props.checkAuth();
      this.props.getWallet();
    })();
  }

  componentWillUpdate() {
    window.scroll(0, 0);
  }

  toggleNotice = () => {
    this.setState({showNotice: !this.state.showNotice})
  }

  render() {
    const { initLoading, isLoggedIn, isLocked, language } = this.props;
    const isShowNotice = (isLoggedIn && !isLocked) && this.state.showNotice
    return (
      <div className={`${navigator.platform.indexOf('Mac') > -1 ? 'isMac' : ''} empty`}>
      {
        !initLoading && (
          <HashRouter>
            <div className="empty">
              <div className={`wrap ${language} ${(!isLoggedIn || isLocked) && 'home'} ${isShowNotice && 'notice'}`}>
                {isShowNotice && <Notice toggleNotice={this.toggleNotice} {...this.props}/>}
                <HeaderContainer />
                <HomeRoute path={ROUTE['home']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={MainPage} />
                <PrivateRoute exact path={ROUTE['mywallet']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={MyWalletPage} />
                <PrivateRoute path={ROUTE['mywallet'] + "/:id"} isLoggedIn={isLoggedIn} isLocked={isLocked} component={CoinDetailPage} />
                <PrivateRoute path={ROUTE['exchange']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={ExchangePage} />
                <PrivateRoute path={ROUTE['transaction']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={TransactionPage} />
                <PrivateRoute path={ROUTE['mypage']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={MyPage} />
                <LoginRoute path={ROUTE['lock']} isLoggedIn={isLoggedIn} isLocked={isLocked} component={LockPage} />
              </div>
              <FooterContainer />
              <PopupContainer />
            </div>
          </HashRouter>
        )
      }
      </div>
    );
  }
}

export default Routes;
