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

  handleUpdateWalletName = () => {
    this.props.onClickOut();
    this.props.setSelectedAccount(this.props.account);
    this.openPopup('updateWalletName');
  }

  handleUpdatePassword = () => {
    this.props.onClickOut();
    this.props.setSelectedAccount(this.props.account);
    this.openPopup('updatePassword');
  }

  handleBackupWallet = () => {
    this.props.onClickOut();
    this.props.setSelectedAccount(this.props.account);
    this.openPopup('backupWallet');
  }

  handleAddToken = () => {
    this.props.onClickOut();
    this.props.setSelectedAccount(this.props.account);
    this.openPopup('addToken', 2);
  }

  handleDeleteWallet = () => {
    this.props.onClickOut();
    this.props.setSelectedAccount(this.props.account);
    this.openPopup('deleteWallet');
  }

  openPopup = (type, num = '') => {
    this.props.togglePopup();
    this.props.setPopupType(type);
    if (num) {
      this.props.setPopupNum(num);
    }
  }

  render() {
    const { I18n } = this.props;
    return (
      <ul>
        <li onClick={this.handleUpdateWalletName} className="name"><span><em className="_img"></em>{I18n.walletMenuBarUpdateWalletName}</span></li>
        <li onClick={this.handleUpdatePassword} className="pw"><span><em className="_img"></em>{I18n.walletMenuBarUpdatePassword}</span></li>
        <li onClick={this.handleBackupWallet} className="backup"><span><em className="_img"></em>{I18n.walletMenuBarBackupWallet}</span></li>
        {
          this.props.walletSectionData.coinType !== 'icx' && (
            <li onClick={this.handleAddToken} className="add"><span><em className="_img"></em>{I18n.walletMenuBarAddToken}</span></li>
          )
        }
        <li onClick={this.handleDeleteWallet} className="del"><span><em className="_img"></em>{I18n.walletMenuBarDeleteWallet}</span></li>
      </ul>
    )
  }
}

export default WalletMenuBar;
