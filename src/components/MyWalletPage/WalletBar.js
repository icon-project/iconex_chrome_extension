import React, { Component } from 'react';
import { routeConstants as ROUTE, currencyUnit as CURRENCY_UNIT, dateFormat as DATE_FORMAT} from 'constants/index'
import { IcxContractAddress as ICX_CONTRACT_ADDRESS } from 'constants/config'
import { LoadingComponent, Alert } from 'components/'
import { convertNumberToText } from 'utils'
import { withRouter } from 'react-router-dom'
import moment from 'moment';
import withLanguageProps from 'HOC/withLanguageProps';


@withRouter
@withLanguageProps
class WalletBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAlertNoBalance: false
    }
  }

  handleClick = () => {
    const { data, history } = this.props;
    const { tokenId, account } = data;
    const url = tokenId ? account + '_' + tokenId : account;
    history.push(ROUTE['mywallet'] + '/' + url );
  }

  handleTransactionClick = () => {
    const { data, history } = this.props;
    const { account, balance, tokenId } = data;
    if (balance.eq(0)) {
      this.setState({
        showAlertNoBalance: true
      })
      return false;
    }
    history.push({
      pathname: ROUTE['transaction'],
      state: {
        accountAddress: account,
        coinTypeIndex: tokenId || account
       }
    });
    this.props.togglePopup();
    this.props.setPopupType(`sendTransaction_transaction`);
  }

  handleSwapClick = () => {
    const { data } = this.props;
    const { tokenId, account } = data;
    this.props.setAccountAddress({
      isLoggedIn: false,
      accountAddress: account,
      coinTypeIndex: tokenId
    })
    this.props.togglePopup();
    this.props.setPopupType(`swapToken`);
    this.props.setPopupNum(0);
  }

  closeAlert = () => {
    this.setState({
      showAlertNoBalance: false
    })
  }

  render() {
    const { showAlertNoBalance } = this.state;
    const { currency, data, I18n } = this.props;
    const { name, balanceLoading = false, symbol, balance, recent, totalResultLoading, balanceWithRate, tokenId } = data;

    const balanceText = convertNumberToText(balance, symbol, true);
    const isSwapAvailable = tokenId === ICX_CONTRACT_ADDRESS

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
          <td onClick={this.handleClick}>{name}</td>
          <td onClick={this.handleClick}><em>{balanceText}</em><span>{symbol.toUpperCase()}</span></td>
          <td onClick={this.handleClick}>
            {!totalResultLoading ? (
              <div>{balanceWithRate !== null && <i className="_img"></i>}<em>{balanceWithRate !== null ? convertNumberToText(balanceWithRate, currency, false) : "-"}</em><em>{CURRENCY_UNIT[currency]}</em></div>
            ) : (
              <div className="load">
                <LoadingComponent type="black"/>
              </div>
            )}
          </td>
          {
            recent.length > 0
              ? (<td onClick={this.handleClick}>{I18n.myWalletBarRecentTransaction}<span>{moment(recent[0].time).format(DATE_FORMAT)}</span></td>)
              : (<td className="no" onClick={this.handleClick}>{I18n.myWalletBarNoTransaction}</td>)
          }
          <td>
            {/* { !isToken && (
              <button disabled={true} className="btn-type-exchange"><span>{I18n.button.exchange}</span></button>
            )} */}
            {isSwapAvailable && <button onClick={this.handleSwapClick} className="btn-type-exchange"><span>{I18n.button.swap}</span></button>}
            <button onClick={this.handleTransactionClick} className="btn-type-exchange"><span>{I18n.button.transfer}</span></button>
          </td>
          {
            showAlertNoBalance && (
              <Alert
                handleCancel={this.closeAlert}
                text={I18n.error.alertNoBalance}
                cancelText={I18n.button.confirm}
              />
            )
          }
        </tr>
      )
    }
  }
}

export default WalletBar;
