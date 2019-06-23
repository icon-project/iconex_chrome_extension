import React, { Component } from 'react';
import { routeConstants as ROUTE } from 'constants/index';
import { ServerChanger } from 'app/components/'
import { HIDE_SERVER } from 'constants/config.js'
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
    this.props.openPopup({
      popupType: 'immunityPopup'
    });
  }

  render() {
    const { pathname } = this.props.location;
    const { I18n, isLocked, isLoggedIn, isLedger } = this.props;
    return (
      (isLocked || !isLoggedIn) && !isLedger
        ? (
            <div className="footer-wrap">
              <span>©2018 ICON Foundation</span>
              <span className="ver">{`Ver.${process.env.APP_VERSION}`}</span>
            </div>
          )
        : (
            <div className="footer-wrap">
              <div className="wrap-holder">
                <p className="txt-copy"><span>©2018 ICON Foundation</span><em></em><span onClick={this.handleImmunityClick} className="noti">{I18n.disclaimerPage.header}</span></p>
                  {
                    !HIDE_SERVER && (
                      <ServerChanger {...this.props} />
                    )
                  }
              <span className="ver">{`Ver.${process.env.APP_VERSION}`}</span>
              </div>
            </div>
          )
      )
    }
  }


export default Footer;
