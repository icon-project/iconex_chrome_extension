import React, { Component } from 'react';

import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class ImmunityPopup extends Component {

  closePopup = () => {
    this.props.closePopup();
  }

  render() {
    const { I18n } = this.props;
    return (
      <div className="popup-wrap">
        <div className="dimmed fade-in"></div>
        <div className="popup moving-down terms">
          <span className="close" onClick={this.closePopup}><em className="_img"></em></span>
          <h1 className="title">{I18n.disclaimerPage.header}</h1>
          <div className="scroll-holder terms">
            <div className="scroll">
              <div className="tabbox-holder">
                <h2>{I18n.disclaimerPage.title}</h2>
                <p className="txt">{I18n.disclaimerPage.desc1}</p>
                <p className="txt">{I18n.disclaimerPage.desc2}</p>
                <p className="txt">{I18n.disclaimerPage.desc3}</p>
                <p className="txt">{I18n.disclaimerPage.desc4}</p>
                <p className="txt">{I18n.disclaimerPage.desc5}</p>
                <p className="txt">{I18n.disclaimerPage.desc6}</p>
                <p className="copy">{I18n.disclaimerPage.copyright}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImmunityPopup;
