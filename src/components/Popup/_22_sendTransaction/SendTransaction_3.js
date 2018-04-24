import React, { Component } from 'react';
import { SmallPopup } from 'components/';
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

  render() {
    const {
      isSuccess
    } = this.state;

    const { I18n, error, swapPage } = this.props;

    let errorText = ''
    switch (error) {
      case 'replacement transaction underpriced':
        errorText = I18n.sendTransaction.anotherFailure
        break;
      case 'intrinsic gas too low':
        errorText = I18n.sendTransaction.gasFailure
        break;
      case 'exceeds block gas limit':
        errorText = I18n.sendTransaction.exceedsFailure
        break;
      case 'insufficient funds for gas * price + value':
        errorText = I18n.sendTransaction.tokenGasFailure
        break;
      default:
        if (!navigator.onLine) {
          errorText = I18n.sendTransaction.internetFailure
        }
        else if (error && error.indexOf('known transaction') !== -1) {
          errorText = I18n.sendTransaction.knownFailure
        }
        else {
          errorText = I18n.sendTransaction.infoFailure
        }
    }

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
