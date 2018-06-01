import React, { Component } from 'react';
import { ValidationForm } from 'app/components/'

import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {

}

@withLanguageProps
class ExportWallet2 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  closePopup = () => {
    this.setState(INIT_STATE);
    this.props.initPopupState();
  }

  handleSubmit = () => {
    this.validationForm.validateForm(['pw', 'pwConfirm'], 'submit');
  }

  handleSuccess = (pw) => {
    this.props.setNewPw(pw);
    this.props.setPopupNum(3);
  }

  render() {
    const { I18n } = this.props;
    return (
      <div className="popup">
        <span onClick={this.closePopup} className="close"><em className="_img"></em></span>
        <h1 className="title">{I18n.exportWallet.title}</h1>
        <h2>{I18n.exportWallet.desc2}</h2>
        <div className="scroll-holder">
  				<div className="scroll">
            <div className="tabbox-holder">
              <ValidationForm
                type="exportWallet"
                ref={instance => { this.validationForm = instance; }}
                onSuccess={(pw) => { this.handleSuccess(pw); }}
                {...this.props}
                onlyPwGroup='margin-none'
                handleSubmit={this.handleSubmit}
              />
              <div className="message-holder"><i className="_img"></i>
                {I18n.exportWallet.infoBoxTitle1}
              </div>
              <div className="message-holder line">
                <ul>
                  <li>{I18n.exportWallet.infoBoxDesc1}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-holder">
          <button onClick={this.handleSubmit} type="submit" className="btn-type-normal"><span>{I18n.button.next}</span></button>
        </div>
      </div>
    );
  }
}

export default ExportWallet2;
