/* eslint-disable array-callback-return */

import React, { Component } from 'react';
import { AddressTable } from 'app/components';
import { makeWalletArray } from 'utils'
import withLanguageProps from 'HOC/withLanguageProps';
import { Alert } from 'app/components/';

@withLanguageProps
class AddressList extends Component {


  componentWillUnmount() {
    this.props.resetReducer();
  }

  noResultError = () => {
    let alertError = '';
    switch (this.props.type) {
      case 'myWallet':
        alertError = 'alertAddressTransaction'
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

  getAddressArr = () => {
    const {
      type,
      wallets,
      selectedAccount,
      selectedTokenId,
      isToken,
      isLedger,
      ledgerWallet
    } = this.props;

    const currentWallet = isLedger ? ledgerWallet : wallets[selectedAccount]

    switch (type) {
      case 'myWallet':
        let addressArr;
        const walletsArr = makeWalletArray(wallets);
        if (!isToken) {
          addressArr = walletsArr;
        } else {
          addressArr = walletsArr.map((wallet) => {
            return Object.assign({}, wallet, {
              'balance': wallet['tokens'][selectedTokenId] ? wallet['tokens'][selectedTokenId]['balance'] : '0',
              'unit': wallet['tokens'][selectedTokenId] ? wallet['tokens'][selectedTokenId]['symbol'] : '',
            })
          })
        }
        addressArr = addressArr
          .filter(l => l.account !== selectedAccount)
          .filter(l => l.type === currentWallet.type)
        return addressArr
      case 'addressBook':
        return this.props[`${currentWallet.type}AddressBook`]
      default:
        break;
    }
  }

  render() {
    const { I18n, isLedger, wallets, ledgerWallet, selectedAccount } = this.props;
    const addressArr = this.getAddressArr();
    const currentWallet = isLedger ? ledgerWallet : wallets[selectedAccount]

    let title = ''
    switch (this.props.type) {
      case 'myWallet':
        title = I18n.addressList.myAddress
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
        break;
      case 'addressBook':
        title = I18n.addressList.addressBook
        break;
      default:
        break;
    }

    return (
      <div>
        <div className="dimmed fade-in"></div>
        <div className="popup address moving-down">
          <span className="close" onClick={this.props.closePopup}><em className="_img"></em></span>
          <h1 className="title">{title}</h1>
          <AddressTable
            selectAddress={(address) => this.props.setRecipientAddress(address, true)}
            listArr={addressArr}
            currentWallet={currentWallet}
            {...this.props} />
        </div>
      </div>
    );
  }
}

export default AddressList;
