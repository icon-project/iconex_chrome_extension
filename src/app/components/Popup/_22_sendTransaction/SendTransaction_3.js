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
    switch (this.props.pageType) {
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
    const { wallets, selectedAccount, recipientAddress } = this.props
    const sending = wallets[selectedAccount]
    const receiving = wallets[recipientAddress]

    let fetchWallet = {}
    fetchWallet[selectedAccount] = sending
    if (receiving) fetchWallet[recipientAddress] = receiving

    this.props.updateWalletBalance(fetchWallet)
  }

  closePopupAfterTx = () => {
    const { funcResult, isLedger } = this.props;
    switch (this.props.pageType) {
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
          this.updateWallets();
          this.props.resetInput();
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

    switch (this.props.pageType) {
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
    }
  }

  getErrorText = () => {
    const { I18n, pageType, sendTransactionError, contractError, selectedWallet } = this.props;
    const { type } = selectedWallet
    const error = pageType === 'contract' ? contractError : sendTransactionError

    if (!navigator.onLine) {
      return I18n.sendTransaction.internetFailure
    }

    if (type === 'icx') {
      if (pageType === 'contract') {
        return error
      } else {
        if (error.indexOf('Step limit too low') !== -1) {
          return I18n.sendTransaction.gasFailure
        }
        return error
      }
    } else {
      if (error.indexOf('known transaction') !== -1) {
        return I18n.sendTransaction.knownFailure
      }
      switch (error) {
        case 'replacement transaction underpriced':
          return I18n.sendTransaction.anotherFailure

        case 'intrinsic gas too low':
          return I18n.sendTransaction.gasLimitFailure

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
    const { I18n, selectedWallet } = this.props;
    const { type } = selectedWallet

    switch (this.props.pageType) {
      case 'transaction':
      case 'contract': {
        return type === 'eth' ? I18n.coinDetailHistoryNoTransactionEth : I18n.coinDetailHistoryIcx
      }
      default:
        return ''
    }
  }

  renderPageTypeSwitch = () => {
    const { I18n, funcResult, selectedWallet, tx } = this.props;
    const { type } = selectedWallet
    const text = this.getText()
    const txUrl = type === 'eth' ? TXID_URL['eth'] + check0xPrefix(tx) : TXID_URL['icx'] + tx
    const { pageType, isLedger } = this.props;
    // Replace txHash to label for opening tracker or etherscan
    const openText = type === 'eth' ? I18n.sendTransaction.openEtherscan : I18n.sendTransaction.openTracker
    switch (pageType) {
      case 'contract': {
        return (
          <div className="popup">
            <p className="txt_box">{I18n.sendTransaction.infoSuccess}</p>
            <p className="txt" ref={ref => { if (ref) ref.innerHTML = text }}></p>
            <a href={TXID_URL['icx'] + funcResult[0]} target="_blank" rel="noopener noreferrer"><p className="mint">{funcResult[0]}</p></a>
            <div className="btn-holder full">
              <button onClick={this.handleSubmit} className="btn-type-normal size-full"><span>{I18n.button.submit}</span></button>
            </div>
          </div>
        )
      }
      case 'transaction': {
        const hideSubmit = type === 'eth' || isLedger
        return (
          <div className="popup">
            <p className="txt_box">{I18n.sendTransaction.infoSuccess}</p>
            <p className="txt" ref={ref => { if (ref) ref.innerHTML = text }}></p>
            <a href={txUrl} target="_blank" rel="noopener noreferrer"><p className="mint">{openText}</p></a>
            {
              hideSubmit ? (
                <div className="btn-holder full">
                  <button onClick={this.closePopupAfterTx} className="btn-type-fill size-full"><span>{I18n.button.close}</span></button>
                </div>
              ) : (
                  <div className="btn-holder full">
                    <button onClick={this.closePopupAfterTx} className="btn-type-fill size-half"><span>{I18n.button.close}</span></button>
                    <button onClick={this.handleSubmit} className="btn-type-normal size-half"><span>{I18n.button.checkTransction}</span></button>
                  </div>
                )
            }
          </div>
        )
      }
      default:
        break;
    }
  }

  renderErrorPageTypeSwitch = () => {
    const { I18n, pageType } = this.props;
    if (pageType === 'contract') {
      return (
        <div className="popup-wrap ledger">
          <div className="dimmed"></div>
          <div className="popup">
            <p className="txt_box">{I18n.sendTransaction.icxFailure}</p>
            <p className="txt">{this.getErrorText()}</p>
            <div className="btn-holder">
              <button onClick={this.closePopup} className="btn-type-fill size-full"><span>{I18n.button.close}</span></button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="popup-wrap ledger">
          <SmallPopup
            handleCancel={this.closePopup}
            text={this.getErrorText()}
            cancelText={I18n.button.close}
          />
        </div>
      )
    }
  }

  render() {
    const {
      isSuccess
    } = this.state;

    return (
      <div>
        {
          isSuccess
            ? this.renderPageTypeSwitch()
            : this.renderErrorPageTypeSwitch()
        }
      </div>
    );
  }
}


export default SendTransaction3;
