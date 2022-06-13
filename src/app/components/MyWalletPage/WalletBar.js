import React, { Component } from 'react';
import { routeConstants as ROUTE, currencyUnit as CURRENCY_UNIT, } from 'constants/index'
import { LoadingComponent, } from 'app/components/'
import { convertNumberToText, checkLength } from 'utils'
import { withRouter } from 'react-router-dom'
import withLanguageProps from 'HOC/withLanguageProps';


@withRouter
@withLanguageProps
class WalletBar extends Component {

  handleClick = () => {
    const { data, history } = this.props;
    const { tokenId, account } = data;
    const url = tokenId ? account + '_' + tokenId : account;
    history.push(ROUTE['mywallet'] + '/' + url);
  }

  handleTransactionClick = () => {
    const { data, history, walletCoinType } = this.props;
    const { account, balance, tokenId, isError, walletBalance } = data;

    if (!isError) {
      if (tokenId) {
        if (walletBalance.eq(0)) {
          this.props.showAlert(`alertNoTxFeeBalance_${walletCoinType}`)
          return false;
        }

        if (balance.eq(0)) {
          this.props.showAlert('alertNoBalance')
          return false;
        }
      } else {
        if (balance.eq(0)) {
          this.props.showAlert('alertNoBalance')
          return false;
        }
      }
    }

    this.props.setSelectedWallet({
      account,
      tokenId
    })
    this.props.openPopup({
      popupType: 'sendTransaction_transfer'
    });
  }

  render() {
    const { currency, data, I18n, isCoinView, getIcon } = this.props;
    const { name, balanceLoading = false, isError, symbol, balance, totalResultLoading, balanceWithRate, tokenId } = data;

    const nameText = checkLength(name) > 18 ? name.substring(0, 18) + '...' : name;
    const balanceText = convertNumberToText(balance, symbol, true);

    const icon = !isCoinView && getIcon(!!tokenId, symbol)

    if (balanceLoading) {
      return (
        <tr>
          <td colSpan="5" className="load">
            <LoadingComponent type="black" />
          </td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td onClick={this.handleClick}>
            {icon} {nameText}
          </td>
          <td onClick={this.handleClick}><em>{isError ? '-' : balanceText}</em><span>{symbol.toUpperCase()}</span></td>
          <td onClick={this.handleClick}>
            {!totalResultLoading ? (
              <div>
                <em>{balanceWithRate !== null ? convertNumberToText(balanceWithRate, currency, false) : "-"}</em><em>{CURRENCY_UNIT[currency]}</em>
              </div>
            ) : (
                <div className="load">
                  <LoadingComponent type="black" />
                </div>
              )}
          </td>
          <td>
            <button onClick={this.handleTransactionClick} className="btn default" style={{width: '100px'}}><span>{I18n.button.transfer}</span></button>
          </td>
        </tr>
      )
    }
  }
}

export default WalletBar;
