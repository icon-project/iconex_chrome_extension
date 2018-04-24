import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';
import { Alert } from 'components/'

const INIT_STATE = {
  recipientAddressError: '',
  showAlertWalletFirst: false
}

@withLanguageProps
class RecipientAddress extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  handleInputChange = (e) => {
    this.props.setRecipientAddress(e.target.value);
  }

  handleInputBlur = () => {
    this.props.setRecipientAddressError();
  }

  openPopup = (type) => {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      this.setState({
        showAlertWalletFirst: true
      })
      return false;
    }
    this.props.togglePopup();
    this.props.setPopupType(type);
  }

  closeAlert = () => {
    this.setState({
      showAlertWalletFirst: false
    })
  }

  render() {
    const { showAlertWalletFirst } = this.state;
    const { isLoggedIn, recipientAddress, recipientAddressError, pageType, I18n } = this.props;
    return (
      <div className="address-holder">
        <div className="group">
          <span className="label">{I18n.transferPageLabel3}</span>
          <input
            type="text"
            className={`txt-type-normal ${recipientAddressError && 'error'}`}
            placeholder={I18n.transferPagePlaceholder2}
            disabled={!isLoggedIn}
            value={recipientAddress}
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
            spellCheck="false"
          />
          <p className="error">{I18n.error[recipientAddressError]}</p>
          <div className="-holder">
            <button className="btn-type-copy" onClick={() => {this.openPopup(`address_${pageType}`)}}><span>{I18n.button.myAddress}</span></button>
            <button className="btn-type-copy" onClick={() => {this.openPopup(`history_${pageType}`)}}><span>{I18n.button.recentTransactionAddress}</span></button>
          </div>
        </div>
        {
          showAlertWalletFirst && (
            <Alert
              handleCancel={this.closeAlert}
              text={I18n.error.alertWalletFirst}
              cancelText={I18n.button.confirm}
            />
          )
        }
      </div>
    );
  }
}

export default RecipientAddress;
