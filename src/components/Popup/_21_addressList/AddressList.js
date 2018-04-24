/* eslint-disable array-callback-return */

import React, { Component } from 'react';
import { makeWalletArray, convertNumberToText, makeAddressStr } from 'utils'
import withLanguageProps from 'HOC/withLanguageProps';
import { Alert } from 'components/';

const INIT_STATE = {

}

@withLanguageProps
class AddressList extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  getListArr = () => {
    const {
      type,
      wallets,
      accountAddress,
      coinTypeIndex
    } = this.props

    let coinTypeId, coin, tokenSymbol;

    switch (type) {
      case 'address_exchange':
      case 'address_transaction':
        let result;
        const walletsArr = makeWalletArray(wallets);
        coinTypeId = coinTypeIndex || accountAddress;
        // if coin is selected
        if (coinTypeId === accountAddress) {
          result = walletsArr;
        // if token is selected
        } else {
          result = walletsArr.map((wallet) => {
            return Object.assign({}, wallet, {
              'balance': wallet['tokens'][coinTypeId] ? wallet['tokens'][coinTypeId]['balance'] : '0',
              'unit': wallet['tokens'][coinTypeId] ? wallet['tokens'][coinTypeId]['symbol'] : ' ',
            })
          })
        }
        return result;
      case 'history_exchange':
      case 'history_transaction':
        coinTypeId = coinTypeIndex || accountAddress;
        if (coinTypeId === accountAddress) {
          coin = wallets[accountAddress];
        } else {
          coin = wallets[accountAddress].tokens[coinTypeId];
          tokenSymbol = coin.symbol;
        }
        let { recent } = coin;
        recent = recent.sort((a, b) => b.time - a.time)
        recent = recent.map((item) => {
          const addressStr = makeAddressStr(item.address, item.type)
          return Object.assign({}, item, {
            'name': wallets[addressStr] ? wallets[addressStr].name : '-',
            'unit': coinTypeId === accountAddress ? item.type : tokenSymbol,
          })
        });
        return recent;
      default:
        return []
    }
  }

  noResultError = () => {
    let alertError = '';
    switch (this.props.type) {
      case 'address_exchange':
        alertError = 'alertAddressExchange'
        break;
      case 'address_transaction':
        alertError = 'alertAddressTransaction'
        break;
      case 'history_exchange':
        alertError = 'alertHistoryExchange'
        break;
      case 'history_transaction':
        alertError = 'alertHistoryTransaction'
        break;
      default:
        alertError = ''
        break;
    }
    return alertError;
  }

  closeAlert = () => {
    this.props.initPopupState();
  }

  render() {
    const { accountAddress, wallets } = this.props;
    const { I18n } = this.props;

    const listArr = this.getListArr().filter(l => (l.account || l.address) !== accountAddress).filter(l => l.type === wallets[accountAddress].type)

    let title = ''
    switch (this.props.type) {
      case 'address_exchange':
      case 'address_transaction':
        title = I18n.addressList.myAddress
        break;
      case 'history_exchange':
      case 'history_transaction':
        title = I18n.addressList.recentHistory
        break;
      default:
    }

    if (listArr.length < 1) {
      const alertError = this.noResultError();
      return (
        <Alert
          handleCancel={this.closeAlert}
          text={I18n.error[alertError]}
          cancelText={I18n.button.confirm}
        />
      )
    } else {
      return (
        <div>
          <div className="dimmed"></div>
      		<div className="popup address">
      			<span className="close" onClick={this.props.initPopupState}><em className="_img"></em></span>
      			<h1 className="title">{title}</h1>
            <AddressTable listArr={listArr} {...this.props}/>
      		</div>
      	</div>
      );
    }
  }
}

class AddressTable extends Component {

  selectAccount(account) {
    this.props.initPopupState();
    this.props.setRecipientAddress(account);
  }

  getQuantityTitle = () => {
    const { I18n } = this.props;
    switch (this.props.type) {
      case 'address_exchange':
      case 'address_transaction':
        return I18n.addressList.quantityHodl
      case 'history_exchange':
        return I18n.addressList.quantityExchange
      case 'history_transaction':
        return I18n.addressList.quantityTransaction
      default:
        return ''
    }
  }

  render() {

    const {
      I18n,
      listArr
    } = this.props

    const quantityTitle = this.getQuantityTitle()

    return (
      <div className="scroll-holder">
				<div className="tabbox-holder">
					<div className="scroll autoH">
						<table className="table-typeA ">
							<thead>
								<tr>
									<th>{I18n.addressList.columnName}</th>
									<th>{quantityTitle}</th>
									<th>{I18n.addressList.columnAddress}</th>
									<th></th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
					<div className="table-holder scroll">
            <table className="table-typeA">
              <thead>
                <tr>
                  <th>{I18n.addressList.columnName}</th>
                  <th>{quantityTitle}</th>
                  <th>{I18n.addressList.columnAddress}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listArr.map((l, i) => {
                    const name = l.name ? l.name : '-'
                    const number = l.balance || l.quantity
                    const account = l.account || l.address
                    const unit = l.unit || l.type
                    return (
                      <tr key={i}>
                        <td>{name}</td>
                        <td>{convertNumberToText(number, unit, true)}<span>{unit.toUpperCase()}</span></td>
                        <td><span className="ellipsis">{account}</span></td>
                        <td><button className="btn-type-choice" onClick={()=>{this.selectAccount(account)}}><span>{I18n.button.select}</span></button></td>
                      </tr>
                    );
                })}
              </tbody>
            </table>
					</div>
				</div>
			</div>
    )
  }
}

export default AddressList;
