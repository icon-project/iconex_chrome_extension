import React, { Component } from 'react';
import { SmallPopup } from 'app/components/';
import { routeConstants as ROUTE } from 'constants/index';
import { withRouter } from 'react-router-dom';

import { txidUrl as TXID_URL } from 'constants/config.js'
import { check0xPrefix } from 'utils';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  isSuccess: false
}

@withRouter
@withLanguageProps
class SendTransaction3 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentWillMount() {
    if (this.props.payload && !this.props.error) {
      this.setState({
        isSuccess: true
      })
    }
    if (!this.props.payload && this.props.error) {
      this.setState({
        isSuccess: false
      })
    }
  }

  closePopup = () => {
    this.props.initPopupState();
  }

  updateWallets = () => {
    const { wallets, accountAddress, recipientAddress } = this.props
    const sending = wallets[accountAddress]
    const receiving = wallets[recipientAddress]

    let fetchWallet = {}
    fetchWallet[accountAddress] = sending
    if (receiving) fetchWallet[recipientAddress] = receiving

    this.props.fetchAll(fetchWallet)
  }

  closePopupAfterTx = () => {
    this.updateWallets()
    this.props.resetInput();
    this.props.initPopupState();
  }

  handleSubmit = () => {
    const { coinTypeIndex, accountAddress, calcData, tx } = this.props;
    const coinTypeId = !coinTypeIndex ? accountAddress : coinTypeIndex
    const url = coinTypeId === accountAddress ? accountAddress : accountAddress + '_' + coinTypeId

    this.props.initPopupState();
    this.props.history.push(ROUTE['mywallet'] + '/' + url);

    if (calcData.coinType !== "icx") {
        window.open(TXID_URL['eth'] + check0xPrefix(tx), '_blank');
    }
  }

  getErrorText = () => {
    const { I18n, error, wallets, accountAddress } = this.props;
    const { type } = wallets[accountAddress]

    if (type === 'icx') {
      return I18n.sendTransaction.icxFailure
    }

    switch (error) {
      case 'replacement transaction underpriced':
        return I18n.sendTransaction.anotherFailure

      case 'intrinsic gas too low':
        return I18n.sendTransaction.gasFailure

      case 'exceeds block gas limit':
        return I18n.sendTransaction.exceedsFailure

      case 'insufficient funds for gas * price + value':
        return I18n.sendTransaction.tokenGasFailure

      default:
        if (!navigator.onLine) {
          return I18n.sendTransaction.internetFailure
        }
        else if (error && error.indexOf('known transaction') !== -1) {
          return I18n.sendTransaction.knownFailure
        }
        else {
          return I18n.sendTransaction.infoFailure
        }
    }
  }

  render() {
    const {
      isSuccess
    } = this.state;

    const { I18n, swapPage } = this.props;
    const errorText = this.getErrorText()

    return (
      <div className="popup-wrap home">
        {
          isSuccess
            ? (
              <SmallPopup
                handleCancel={this.closePopupAfterTx}
                handleSubmit={this.handleSubmit}
                text={swapPage ? I18n.sendTransaction.swapSuccess : I18n.sendTransaction.infoSuccess}
                cancelText={I18n.button.close}
                submitText={I18n.button.checkTransction}
              />
            )
            : (
              <SmallPopup
                handleCancel={this.closePopup}
                text={errorText}
                cancelText={I18n.button.close}
              />
            )
        }
      </div>
    );
  }
}


export default SendTransaction3;
