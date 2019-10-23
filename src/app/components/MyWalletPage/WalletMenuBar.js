import React, { Component } from 'react';
import withClickOut from 'HOC/withClickOut'
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {

}

@withClickOut
@withLanguageProps
class WalletMenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  handleMenuClick = (popupType, popupNum = 1) => {
    const {
      account,
      onClickOut,
      setSelectedWallet,
      openPopup
    } = this.props;

    onClickOut();
    setSelectedWallet({
      account
    });
    openPopup({
      popupType,
      popupNum
    });
  }

  isWalletHasNoBalance = (data) => {
    for (const { balance } of data) {
      if (!balance.eq(0)) {
        return false
      }
    }
    return true
  }

  render() {
    const { I18n, walletSectionData } = this.props;
    return (
      <ul>
        <li onClick={() => this.handleMenuClick('updateWalletName')} className="name"><span><em className="_img"></em>{I18n.walletMenuBarUpdateWalletName}</span></li>
        <li onClick={() => this.handleMenuClick('updatePassword')} className="pw"><span><em className="_img"></em>{I18n.walletMenuBarUpdatePassword}</span></li>
        <li onClick={() => this.handleMenuClick('backupWallet')} className="backup"><span><em className="_img"></em>{I18n.walletMenuBarBackupWallet}</span></li>
        <li onClick={() => this.handleMenuClick('addToken', walletSectionData.coinType === 'eth' ? 2 : 1)} className="add"><span><em className="_img"></em>{I18n.walletMenuBarAddToken}</span></li>
        <li onClick={() => {
          if (this.isWalletHasNoBalance(walletSectionData.data)) {
            return this.handleMenuClick('deleteWallet')
          }
          return this.handleMenuClick('deleteWallet_hasBalance')
        }} className="del"><span><em className="_img"></em>{I18n.walletMenuBarDeleteWallet}</span></li>
      </ul>
    )
  }
}

export default WalletMenuBar;
