import React, { Component } from 'react';
import { CheckPassword } from 'app/components/';
import withLanguageProps from 'HOC/withLanguageProps';
import { walletNameSelector, walletPrivSelector, walletCoinTypeSelector } from 'redux/helper/walletSelector'

@withLanguageProps
class BackupWallet1 extends Component {

  closePopup = () => {
    this.props.closePopup();
    this.props.resetSelectedWallet();
  }

  handleSuccess = (data) => {
      this.props.setPrivKeyAndV3ForBackup({
        privKey: data.privKey, v3: data.v3
      });
      this.props.setPopupNum(2);
  }

  render() {

    const name = walletNameSelector();
    const priv = walletPrivSelector();
    const coinType = walletCoinTypeSelector();

    return (
      <div className="popup size-medium2">
        <CheckPassword type="backupWallet" coinType={coinType} walletName={name} priv={priv} onCancel={this.closePopup} onSuccess={this.handleSuccess} />
      </div>
    );
  }
}


export default BackupWallet1;
