import React, { Component } from 'react';
import { routeConstants as ROUTE } from 'constants/index';
import { APP_VERSION } from 'constants/config.js'
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {

}

@withLanguageProps
class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  handleImmunityClick = (e) => {
    this.props.togglePopup();
    this.props.setPopupType('immunityPopup');
  }

  render() {
    const { pathname } = this.props.location;
    const { I18n } = this.props;
    return (
      pathname === ROUTE['lock']
        ? (
            <div></div>
          )
        : pathname === ROUTE['home']
            ? (
              <div></div>
              )
            : (
              <div className="footer-wrap">
          			<div className="wrap-holder">
          				<p className="txt-copy"><span>©2018 ICON Foundation</span><em></em><span onClick={this.handleImmunityClick} className="noti">{I18n.disclaimerPage.header}</span></p>
                  <span className="ver">{`Ver.${APP_VERSION}`}</span>
                </div>
          		</div>
              )
      )
    }
  }


export default Footer;
