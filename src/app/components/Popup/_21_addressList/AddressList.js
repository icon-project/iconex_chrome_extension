/* eslint-disable array-callback-return */

import React, { Component } from 'react';
import { AddressTable, SmallPopup } from 'app/components';
import { check0xPrefix } from 'utils'
import withLanguageProps from 'HOC/withLanguageProps';
import { Alert } from 'app/components/';
import { walletArraySelector, walletCoinTypeSelector } from 'redux/helper/walletSelector'
import { ETH_SCAN } from 'constants/config.js'


@withLanguageProps
class AddressList extends Component {
  constructor(props) {
    super(props);

    const {
      type,
      selectedAccount,
      selectedTokenId,
      txHistory,
      isToken,
    } = props;

    this.state = {
      addressArr: []
    };

    switch (type) {
      case 'address_transaction':
        let addressArr;
        const walletsArr = walletArraySelector();
        if (!isToken) {
          addressArr = walletsArr;
        } else {
          addressArr = walletsArr.map((wallet) => {
            return Object.assign({}, wallet, {
              'balance': wallet['tokens'][selectedTokenId] ? wallet['tokens'][selectedTokenId]['balance'] : '0',
              'unit': wallet['tokens'][selectedTokenId] ? wallet['tokens'][selectedTokenId]['symbol'] : ' ',
            })
          })
        }
        addressArr = addressArr
                    .filter(l => l.account !== selectedAccount)
                    .filter(l => l.type === walletCoinTypeSelector())

        this.state = {
          addressArr
        }
        break;

      case 'history_transaction':
        const txHistoryFilter = txHistory.filter(l => l.toAddr !== selectedAccount)
        this.state = {
          addressArr: txHistoryFilter
        }
        break;
      default:
        break;
    }
  }

  componentWillUnmount() {
    this.props.resetReducer();
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
    this.props.closePopup();
  }

  render() {
    const { I18n, selectedAccount } = this.props;
    const { addressArr } = this.state;

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

    if (this.props.type === 'history_transaction' && walletCoinTypeSelector() === 'eth') {
      return (
        <div>
          <div className="dimmed"></div>
          <div className="popup-wrap home">
            <SmallPopup
              handleCancel={this.closeAlert}
              text={`${I18n.coinDetailHistoryNoTransactionEth}<br/><a href=${ETH_SCAN()}/address/${check0xPrefix(selectedAccount)} target="_blank">https://etherscan.io/</a>`}
              cancelText={I18n.button.close}
              submitText={undefined}
            />
          </div>
        </div>
      )
    }

    if (addressArr.length < 1) {
      const alertError = this.noResultError();
      return (
        <Alert
          handleCancel={this.closeAlert}
          text={I18n.error[alertError]}
          cancelText={I18n.button.confirm}
        />
      )
    }

    return (
      <div>
        <div className="dimmed"></div>
    		<div className="popup address">
    			<span className="close" onClick={this.props.closePopup}><em className="_img"></em></span>
    			<h1 className="title">{title}</h1>
          <AddressTable
            selectAddress={(address) => this.props.setRecipientAddress(address)}
            listArr={addressArr}
            {...this.props}/>
    		</div>
    	</div>
    );
  }
}

export default AddressList;
