import React, { Component } from 'react';
import { CheckPassword } from 'components/';
import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class BackupWallet1 extends Component {

  closePopup = () => {
    this.props.initPopupState();
  }

  handleSuccess = (privKey) => {
      this.props.setPrivKeyForBackup(privKey);
      this.props.setPopupNum(2);
  }

  render() {
    const {
      wallets, selectedAccount
    } = this.props;

    const name = wallets[selectedAccount].name;
    const priv = wallets[selectedAccount].priv;

    return (
      <div className="popup size-medium2">
        <CheckPassword walletName={name} priv={priv} onCancel={this.closePopup} onSuccess={this.handleSuccess} />
      </div>
    );
  }
}


export default BackupWallet1;
