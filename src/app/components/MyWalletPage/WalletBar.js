import React, { Component } from 'react';
import { routeConstants as ROUTE, currencyUnit as CURRENCY_UNIT, dateFormat as DATE_FORMAT} from 'constants/index'
import { ICX_TOKEN_CONTRACT_ADDRESS } from 'constants/config'
import { LoadingComponent, Alert } from 'app/components/'
import { convertNumberToText, checkLength } from 'utils'
import { withRouter } from 'react-router-dom'
import moment from 'moment';
import withLanguageProps from 'HOC/withLanguageProps';


@withRouter
@withLanguageProps
class WalletBar extends Component {

  handleClick = () => {
    const { data, history } = this.props;
    const { tokenId, account } = data;
    const url = tokenId ? account + '_' + tokenId : account;
    history.push(ROUTE['mywallet'] + '/' + url );
  }

  handleTransactionClick = () => {
    const { data, history, walletCoinType } = this.props;
    const { account, balance, tokenId, isError, walletBalance } = data;

    if (!isError) {
      if (tokenId) {
        if (walletBalance.eq(0)) {
          this.props.showAlert('showAlertNoTxFeeBalance', walletCoinType)
          return false;
        }

        if (balance.eq(0)) {
          this.props.showAlert('showAlertNoBalance')
          return false;
        }
      } else {
        if (balance.eq(0)) {
          this.props.showAlert('showAlertNoBalance')
          return false;
        }
      }
    }

    this.props.setSelectedWallet({
      account,
      tokenId
    })
    history.push({
      pathname: ROUTE['transaction']
    });
    this.props.openPopup({
      popupType: 'sendTransaction_transaction'
    });
  }

  handleSwapClick = () => {
    const { data } = this.props;
    const { tokenId, balance, walletBalance, account, isError } = data;

    if (!isError) {
      if (balance.eq(0)) {
        this.props.showAlert('showAlertNoSwapBalance')
        return false;
      }

      if (walletBalance.eq(0)) {
        this.props.showAlert('showAlertNoSwapGasBalance')
        return false;
      }
    }

    this.props.setSelectedWallet({
      account,
      tokenId
    })
    this.props.openPopup({
      popupType: 'swapToken'
    });
  }

  render() {
    const { currency, data, I18n } = this.props;
    const { name, balanceLoading = false, isError, symbol, balance, totalResultLoading, balanceWithRate } = data;

    const nameText = checkLength(name) > 18 ? name.substring(0, 18) + '...' : name;
    const balanceText = convertNumberToText(balance, symbol, true);
    const isSwapAvailable = false;

    if (balanceLoading) {
      return (
        <tr>
          <td colSpan="5" className="load">
            <LoadingComponent type="black"/>
          </td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td onClick={this.handleClick}>{nameText}</td>
          <td onClick={this.handleClick}><em>{isError ? '-' : balanceText}</em><span>{symbol.toUpperCase()}</span></td>
          <td onClick={this.handleClick}>
            {!totalResultLoading ? (
              <div>{balanceWithRate !== null && <i className="_img"></i>}<em>{balanceWithRate !== null ? convertNumberToText(balanceWithRate, currency, false) : "-"}</em><em>{CURRENCY_UNIT[currency]}</em></div>
            ) : (
              <div className="load">
                <LoadingComponent type="black"/>
              </div>
            )}
          </td>
          {/* {
            recent.length > 0
              ? (<td onClick={this.handleClick}>{I18n.myWalletBarRecentTransaction}<span>{moment(recent[0].time).format(DATE_FORMAT)}</span></td>)
              : (<td className="no" onClick={this.handleClick}>{I18n.myWalletBarNoTransaction}</td>)
          } */}
          <td>
            {isSwapAvailable && <button onClick={this.handleSwapClick} className="btn-type-exchange"><span>{I18n.button.swap}</span></button>}
            <button onClick={this.handleTransactionClick} className="btn-type-exchange"><span>{I18n.button.transfer}</span></button>
          </td>
        </tr>
      )
    }
  }
}

export default WalletBar;
