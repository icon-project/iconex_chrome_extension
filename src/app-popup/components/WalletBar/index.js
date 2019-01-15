import React, { Component } from 'react';
import { convertNumberToText, makeTxHash } from 'utils'
import withLanguageProps from 'HOC/withLanguageProps';
import { LoadingComponent } from 'app/components/'
import { routeConstants as ROUTE } from 'constants/index.js';
import { withRouter } from 'react-router-dom';
import { IconUtil } from 'icon-sdk-js'

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
    if (this.props.addressRequest) {
      return
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
  
  goTxData = () => {
    this.props.history.push(ROUTE['txdata'])
  }

  render() {
    const { wallet, index, I18n, password, handleChange, pwError, confirmLoading, isInput, txHash, params, addressRequest, selected, isTransaction } = this.props
    const { addressHoverState, addressClickState } = this.state;
    const balanceText = convertNumberToText(wallet.balance, wallet.type, true);
    console.log(IconUtil.makeTxHash(params))
    const isError = txHash !== IconUtil.makeTxHash(params)
    return (
      <li className={(addressRequest ? 'link' : '') + (selected === wallet.account ? ' on' : '')}>
        {addressRequest && <i className="_img" onClick={this.onRadioClick}></i>}
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

        {isInput &&
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
            {confirmLoading ?
              <button className="btn-type-ok load">
                <span><LoadingComponent type="black" style={{height: '8px', display: '-webkit-inline-box'}}/></span>
              </button>
              :
              <button className="btn-type-ok" disabled={!password} onClick={this.onConfirmClick}>
                <span>{isTransaction ? I18n.button.transfer : I18n.button.confirm}</span>
              </button>
            }
            <button className="btn-type-normal" onClick={this.onCancelClick}><span>{I18n.button.cancel}</span></button>
          </div>
        }
        {txHash &&
          <div className={`hash-holder ${!pwError ? 'no-error' : ''}`}>
            <div>
              <span>TxHash</span>
              {Array.isArray(txHash) ?
                txHash.map((t, i) => <p key={i} className="address" title={t}>{t}</p>)
                :
                <p className="address" title={txHash}>{txHash}</p>
              }
            </div>
            {params && isError && <p className="error">{I18n.widget.checkTxHash}</p>}
          </div>
        }
        {params &&
          <dir className={`tx${isError ? '' : ' down'}`}>
            <p className="btn-type-tx" onClick={this.goTxData}><span>TxData</span></p>
          </dir>
        }
      </li>
    )
  }

}

export default withRouter(WalletBar);
