import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';
import { Alert, LoadingComponent } from 'app/components/'
import { makeEthRawTx } from 'utils/utils'

const INIT_STATE = {
  recipientAddressError: '',
  showAlertWalletFirst: false
}

@withLanguageProps
class RecipientAddress extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
    this.timeout = null;
  }

  handleInputChange = (e) => {
    this.props.setRecipientAddress(e.target.value, true);
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

    if (type === `history_transaction`) {
      this.props.fetchRecentHistory();
    } else {
      this.props.openPopup({
        popupType: type
      });
    }
  }

  closeAlert = () => {
    this.setState({
      showAlertWalletFirst: false
    })
  }

  render() {
    const { showAlertWalletFirst } = this.state;
    const { isLoggedIn, calcData, historyLoading, recipientAddress, recipientAddressError, I18n } = this.props;
    const hideRecentAddressButton = isLoggedIn && calcData.walletCoinType === 'eth'
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
            <button className="btn-type-copy" onClick={() => {this.openPopup(`address_transaction`)}}><span>{I18n.button.myAddress}</span></button>
            {
              !hideRecentAddressButton && (historyLoading ? (<button disabled style={{paddingBottom: 8, paddingTop: 3, background: '#fff'}} className="btn-type-copy"><span><LoadingComponent type="black"/></span></button>)
                                                          : (<button className="btn-type-copy" onClick={() => {this.openPopup(`history_transaction`)}}><span>{I18n.button.recentTransactionAddress}</span></button>))
            }
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
