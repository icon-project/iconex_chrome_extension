import React, { Component } from 'react';
import withClickOut from 'HOC/withClickOut'
import withLanguageProps from 'HOC/withLanguageProps';
import { IS_V3 } from 'constants/config.js'

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

  render() {
    const { I18n, walletSectionData } = this.props;
    return (
      <ul>
        <li onClick={() => this.handleMenuClick('updateWalletName')} className="name"><span><em className="_img"></em>{I18n.walletMenuBarUpdateWalletName}</span></li>
        <li onClick={() => this.handleMenuClick('updatePassword')} className="pw"><span><em className="_img"></em>{I18n.walletMenuBarUpdatePassword}</span></li>
        <li onClick={() => this.handleMenuClick('backupWallet')} className="backup"><span><em className="_img"></em>{I18n.walletMenuBarBackupWallet}</span></li>
        {(IS_V3 || walletSectionData.coinType === 'eth') && (<li onClick={() => this.handleMenuClick('addToken', 2)} className="add"><span><em className="_img"></em>{I18n.walletMenuBarAddToken}</span></li>)}
        <li onClick={() => this.handleMenuClick('deleteWallet')} className="del"><span><em className="_img"></em>{I18n.walletMenuBarDeleteWallet}</span></li>
      </ul>
    )
  }
}

export default WalletMenuBar;
