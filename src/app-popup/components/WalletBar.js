import React, { Component } from 'react';
import { convertNumberToText, isEmpty } from 'utils'
import withLanguageProps from 'HOC/withLanguageProps';
import { LoadingComponent } from 'app/components/'

@withLanguageProps
class WalletBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAlertNoBalance: false,
      addressHoverState: 'address',
      addressClickState: ''
    }
  }

  handleAddressMouseOver = (addressHoverState) => {
    if (this.props.addressRequest) {
      return
    }

    this.setState({
      addressHoverState: addressHoverState
    })
  }

  handleCopy = () => {
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

  onCellClick = () => {
    if (this.props.addressRequest) {
      this.props.sendAddress(this.props.wallet.account)
    }
  }

  onConfirmClick = () => {
    this.props.confirmPassword(this.props.wallet.account)
  }

  onCancelClick = () => {
    this.props.cancelPassword()
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onConfirmClick();
    }
  }
  
  render() {
    const { wallet, index, I18n, password, handleChange, pwError, confirmLoading, txHash, addressRequest } = this.props
    const { addressHoverState, addressClickState } = this.state;
    const balanceText = convertNumberToText(wallet.balance, wallet.type, true);
    return (
      <li className={addressRequest ? 'link' : ''} onClick={this.onCellClick}>
        <span className="name">{wallet.name}<em>{Object.keys(wallet.tokens).length + 1}</em></span>
        <span className="coin">{wallet.isError ? '-' : balanceText}<em>{wallet.type.toUpperCase()}</em></span>
        {
          addressClickState !== 'complete' ? (
            <p onMouseEnter={() => this.handleAddressMouseOver('copy')} onMouseLeave={() => this.handleAddressMouseOver('address')} onClick={this.handleCopy} className={addressHoverState}>{wallet.account}
              {addressHoverState === 'copy' && <em>{I18n.button.copy}</em>}
            </p>
          ) : (
              <p className={addressClickState}>{I18n.button.copyFinish}</p>
            )
        }
        <span className={`copyKey copyKey${index}`}>{wallet.account}</span>

        {txHash &&
          <div className="pass-holder">
            <div className="name-group">
              <input type="password" className={`txt-type-normal ${pwError ? 'error' : ''}`} spellCheck="false"
                placeholder={I18n.checkPassword.placeHolder}
                value={password}
                onChange={handleChange}
                onKeyPress={this.handleKeyPress}
              />
              {pwError && <p className="error">{pwError}</p>}
            </div>
            <button className="btn-type-normal" onClick={this.onCancelClick}>
              <span>{I18n.button.cancel}</span>
            </button>
            {confirmLoading ?
              <button className="btn-type-ok load">
                <span><LoadingComponent type="black" /></span>
              </button>
              :
              <button className="btn-type-ok" onClick={this.onConfirmClick}>
                <span>{I18n.button.confirm}</span>
              </button>
            }
          </div>
        }
        {txHash &&
          <div className={`hash-holder ${!pwError ? 'no-error' : ''}`}>
            <div>
              <span>TxHash</span>
              {Array.isArray(txHash) ?
                txHash.map(t => <p className="address">{t}</p>)
                :
                <p className="address">{txHash}</p>
              }
            </div>
          </div>
        }
      </li>
    )
  }

}

export default WalletBar;
