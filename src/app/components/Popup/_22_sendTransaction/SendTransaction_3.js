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
    switch(this.props.pageType) {
      case 'swap': {
        this.props.resetSignupReducer();
        this.props.resetSelectedWallet();
        this.props.closePopup();
        this.props.logIn();
        break;
      }
      case 'contract':
      case 'transaction': {
        this.props.closePopup();
        break;
      }
      default:
        break;
    }
  }

  updateWallets = () => {
    const { wallets, selectedAccount, recipientAddress  } = this.props
    const sending = wallets[selectedAccount]
    const receiving = wallets[recipientAddress]

    let fetchWallet = {}
    fetchWallet[selectedAccount] = sending
    if (receiving) fetchWallet[recipientAddress] = receiving

    this.props.fetchAll(fetchWallet)
  }

  closePopupAfterTx = () => {
    const { funcResult, isLedger } = this.props;
    switch(this.props.pageType) {
      case 'swap': {
        this.props.resetInput();
        this.props.resetSelectedWallet();
        this.props.closePopup();
        this.props.logIn();
        break;
      }
      case 'contract': {
        this.updateWallets();
        this.props.resetContractInputOutput();
        window.open(TXID_URL['icx'] + check0xPrefix(funcResult[0]), '_blank');
        this.props.closePopup();
        break;
      }
      case 'transaction': {
        this.props.closePopup();
        if (!isLedger) {
          this.props.history.push(ROUTE['mywallet']);
        } else {
          this.props.updateLedgerWalletBalance();
          this.props.resetInput();
        }
        break;
      }
      default:
        break;
    }
  }

  handleSubmit = () => {
    const { selectedAccount, selectedTokenId, isToken, calcData, tx } = this.props;
    const url = !isToken ? selectedAccount : selectedAccount + '_' + selectedTokenId

    switch(this.props.pageType) {
      case 'swap': {
        this.props.resetInput();
        this.props.resetSelectedWallet();
        this.props.closePopup();
        this.props.logIn();
        window.open(TXID_URL['eth'] + check0xPrefix(tx), '_blank');
        break;
      }
      case 'contract': {
        this.updateWallets();
        this.props.resetContractInputOutput();
        this.props.closePopup();
        break;
      }
      case 'transaction': {
        this.props.closePopup();
        this.props.history.push(ROUTE['mywallet'] + '/' + url);

        if (calcData.walletCoinType !== "icx") {
            window.open(TXID_URL['eth'] + check0xPrefix(tx), '_blank');
        }
        break;
      }
      default:
        break;
    }note
  }

  getErrorText = () => {
    const { I18n, error, selectedWallet} = this.props;
    const { type } = selectedWallet

    if (!navigator.onLine) {
      return I18n.sendTransaction.internetFailure
    }

    if (type === 'icx') {
      switch (error) {
        case -32700:
          return 'Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.'

        case -32600:
          return 'The JSON sent is not a valid Request object.'

        case -32601:
          return 'The method does not exist / is not available.'

        case -32602:
          return 'Invalid method parameter(s).'

        case -32603:
          return 'Internal JSON-RPC error.'

        case -32000:
          return 'IconServiceEngine 내부에서 발생하는 오류'

        case -32100:
          return 'Score 내부에서 발생하는 오류'

        default:
          return I18n.sendTransaction.icxFailure
      }
    } else {
      if (error.indexOf('known transaction') !== -1) {
        return I18n.sendTransaction.knownFailure
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
          return I18n.sendTransaction.infoFailure
      }
    }
  }

  getText = () => {
    const { I18n, isLedger } = this.props;

    switch(this.props.pageType) {
      case 'swap': {
        return `${I18n.sendTransaction.swapSuccess}<br/><a href='https://docs.google.com/spreadsheets/d/1HiT98wqEpFgF2d98eJefQfH7xK4KPPxNDiiXg3AcJ7w/edit#gid=0' target="_blank">${I18n.swapToken.rightInfoDesc1_1_3_1}</a>`
      }
      case 'contract': {
        break;
      }
      case 'transaction': {
        const { tx, selectedWallet } = this.props;
        const { type } = selectedWallet
        if (type === 'eth') {
          return `${I18n.sendTransaction.infoSuccess}<br/>${I18n.coinDetailHistoryNoTransactionEth}<br/><a href=${TXID_URL['eth'] + check0xPrefix(tx)} target="_blank">https://etherscan.io/</a>`
        } else {
          return isLedger ? `${I18n.sendTransaction.infoSuccess}<br/>${I18n.coinDetailHistoryIcx}<br/><a href=${TXID_URL['icx'] + tx} target="_blank">https://tracker.icon.foundation/</a>` : I18n.sendTransaction.infoSuccess
        }
      }
      default:
        return ''
    }
  }

  renderPageTypeSwitch = () => {
    const { I18n, funcResult, selectedWallet } = this.props;
    const { type } = selectedWallet
    const text = this.getText()
    const { pageType, isLedger } = this.props;
    switch(pageType) {
      case 'contract': {
        return (
          <div className="popup complete">
            <p className="txt_box">{I18n.sendTransaction.txComplete}</p>
            <div className="scroll-holder">
              <div className="scroll">
                <p className="title">{I18n.sendTransaction.txHashTracker}</p>
                <p onClick={this.closePopupAfterTx} className="address">{funcResult[0]}</p>
              </div>
            </div>
            <div className="btn-holder">
              <button onClick={this.handleSubmit} className="btn-type-fill size-full"><span>{I18n.button.submit}</span></button>
            </div>
          </div>
        )
      }
      case 'swap':
      case 'transaction': {
        const hideSubmit = type === 'eth' || isLedger
        return (
          <div className="popup-wrap home">
            <SmallPopup
              handleCancel={this.closePopupAfterTx}
              handleSubmit={this.handleSubmit}
              text={text}
              cancelText={I18n.button.close}
              submitText={hideSubmit ? undefined : I18n.button.checkTransction}
            />
          </div>
        )
      }
      default:
        break;
    }
  }

  render() {
    const {
      isSuccess
    } = this.state;

    const { I18n } = this.props;
    return (
      <div>
        {
          isSuccess
            ? this.renderPageTypeSwitch()
            : (
              <div className="popup-wrap home">
                <SmallPopup
                  handleCancel={this.closePopup}
                  text={this.getErrorText()}
                  cancelText={I18n.button.close}
                />
              </div>
            )
        }
      </div>
    );
  }
}


export default SendTransaction3;
