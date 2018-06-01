import React, { Component } from 'react';
import {
  routeConstants as ROUTE
} from 'constants/index.js';
import { Link } from 'react-router-dom';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  showInfo: false,
  toggleLanguageList: false
}

@withLanguageProps
class Header extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  toggleLanguageList = () => {
    this.setState({
      toggleLanguageList: !this.state.toggleLanguageList
    })
  }

  showInfo = () => {
    this.setState({
      showInfo: true
    })
  }

  disableExchange = () => {
    const { I18n } = this.props;
    alert(I18n.error.alertExchange);
    return;
  }

  hideInfo = () => {
    this.setState({
      showInfo: false
    })
  }

  onHeaderClick = () => {
    if (this.state.toggleLanguageList) {
      this.setState({
        toggleLanguageList: false
      })
    }
  }

  render() {
    const { setLanguage, language, location, I18n } = this.props;
    const isHome = location.pathname === ROUTE['home'];
    const isLock = location.pathname === ROUTE['lock']
    const showHeaderItem = isHome ? false : isLock ? false : true

    return (
  		<div className="header-wrap" onClick={this.onHeaderClick}>
  			<div className="wrap-holder">
          {showHeaderItem && (
  				  <Link to={isHome ? ROUTE['home'] : ROUTE['mywallet']}><p className="logo"><span className="_img"></span></p></Link>
          )}
          {showHeaderItem && (
            <div className="menu-holder">
    					<Link to="/mywallet"><span className={`wallet ${location.pathname.includes('/mywallet') && 'on'}`}>{I18n.myWallet}</span></Link>
    					{/* <span onClick={this.disableExchange} className={`exchange ${location.pathname === '/exchange' && 'on'}`}>{I18n.exchange}</span> */}
    					<Link to="/transaction"><span className={`remittance ${location.pathname === '/transaction' && 'on'}`}>{I18n.transfer}</span></Link>
              <Link to="/mypage"><span className={`remittance ${location.pathname === '/mypage' && 'on'}`}>{I18n.myPage}</span></Link>
            </div>
          )}
  				<div className="language-holder">
            <span onClick={() => setLanguage('kr')} className={language === 'kr' ? 'on' : ''}>KR</span>
  					<span className="dot">·</span>
  					<span onClick={() => setLanguage('en')} className={language === 'en' ? 'on' : ''}>EN</span>
  				</div>
  			</div>
  		</div>
    );
  }
}

export default Header;
