import React, { Component } from 'react';
import { convertNumberToText } from 'utils'
import withLanguageProps from 'HOC/withLanguageProps';
import { LoadingComponent } from 'app/components/'

@withLanguageProps
class WalletBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAlertNoBalance: false,
      addressHoverState: 'address',
      addressClickState: '',
      showTxHash: false
    }
  }

  handleAddressMouseOver = (addressHoverState) => {
    if (this.props.addressRequest || this.props.isInput) {
      return;
    }

    this.setState({
      addressHoverState: addressHoverState
    })
  }

  handleCopy = () => {
    if (this.props.addressRequest || this.props.isInput) {
      return;
    }

    const key = document.querySelector(`span.copyKey${this.props.index}`);
    if (this.state.addressClickState === 'complete') {
      return false;
    } else {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(key);
      selection.removeAllRanges();
      selection.addRange(range);
      try {
        document.execCommand('copy');
        selection.removeAllRanges();
        this.setState({
          addressClickState: 'complete'
        }, () => {
          const self = this;
          window.setTimeout(function () {
            self.setState({
              addressClickState: '',
              addressHoverState: 'address',
            })
          },
            1000)
        }
        )
      } catch (e) {
        alert(e);
      }
    }
  }

  onRadioClick = () => {
    this.props.selectAddress(this.props.wallet.account)
  }

  onConfirmClick = () => {
    if (this.props.password) {
      this.props.confirmPassword(this.props.wallet.account)
    }
  }

  onCancelClick = () => {
    this.props.cancelEvent()
  }

  handleKeyPress = (e) => {
    if (this.props.password && e.key === 'Enter') {
      this.onConfirmClick();
    }
  }

  onTxDataClick = () => {
    const { showTxHash } = this.state;
    this.setState({
      showTxHash: !showTxHash
    })
  }

  render() {
    const { wallet, index, I18n, password, handleChange, pwError, confirmLoading, isInput, addressRequest, txHash, selected, isTransaction } = this.props;
    const { addressHoverState, addressClickState, showTxHash } = this.state;
    const balanceText = convertNumberToText(wallet.balance, wallet.type, true);
    return (
      <li className={(addressRequest ? 'link' : '') + (selected === wallet.account ? ' on' : '')}>
        {addressRequest && <i className="_img" onClick={this.onRadioClick}></i>}
        <span className="name">{wallet.name}<em>{Object.keys(wallet.tokens).length + 1}</em></span>
        <span className="coin">{wallet.isError ? '-' : balanceText}<em>{wallet.type.toUpperCase()}</em></span>
        {
          addressClickState !== 'complete' ? (
            // <p onMouseEnter={() => this.handleAddressMouseOver('copy')} onMouseLeave={() => this.handleAddressMouseOver('address')} onClick={this.handleCopy} className={addressHoverState}>{wallet.account}
            //   {addressHoverState === 'copy' && <em>{I18n.button.copy}</em>}
            // </p>
            <p onMouseEnter={() => this.handleAddressMouseOver('copy')} onClick={this.handleCopy} className="address">{wallet.account}
              {addressHoverState === 'copy' && <em>{I18n.button.copy}</em>}
            </p>
          ) : (
              <p className={`address ${addressClickState}`}>{wallet.account} <em>{I18n.button.copyFinish}</em></p>
            )
        }
        <span className={`copyKey copyKey${index}`}>{wallet.account}</span>

        {isInput && 
          <div className="pass-holder">
            <div className="name-group">
              <input type="password" className={`txt-type-normal ${pwError ? 'error' : ''}`} spellCheck="false"
                placeholder={I18n.checkPassword.placeholder}
                value={password}
                onChange={handleChange}
                onKeyPress={this.handleKeyPress}
              />
              {pwError && <p className="error">{pwError}</p>}
            </div>
            <button className="btn-type-line" onClick={this.onCancelClick}><span>{I18n.button.cancel}</span></button>
            {confirmLoading ?
              <button className="btn-type-line load">
                <span><LoadingComponent type="black" /></span>
              </button>
              :
              <button className="btn-type-line" disabled={!password} onClick={this.onConfirmClick}>
                <span>{isTransaction ? I18n.button.transfer : I18n.button.confirm}</span>
              </button>
            }
          </div>
        }
        {showTxHash &&
          <div className={`hash-holder ${!pwError ? 'no-error' : ''}`}>
            <div>
              <span>Sign TxHash</span>
              {Array.isArray(txHash) ?
                txHash.map((t, i) => <p key={i} className="address" title={t}>{t}</p>)
                :
                <p className="address" title={txHash}>{txHash}</p>
              }
            </div>
          </div>
        }
        {isInput && txHash &&
        <div className="tx">
          <button className="btn-type-line" onClick={this.onTxDataClick}>
            <span>Tx Data</span>
          </button>
        </div>
        }
      </li>
    )
  }

}

export default WalletBar;
