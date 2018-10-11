import React, { Component } from 'react';
import { CheckPassword } from 'app/components/';
import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class DeleteWallet1 extends Component {

  closePopup = () => {
    this.props.closePopup();
    this.props.resetSelectedWallet();
  }

  handleSuccess = (data) => {
    this.props.setPopupNum(2);
  }

  render() {
    const {
      wallets, selectedAccount
    } = this.props;

    const name = wallets[selectedAccount].name;
    const priv = wallets[selectedAccount].priv;
    const coinType = wallets[selectedAccount].type;

    return (
      <div className="popup size-medium2">
        <CheckPassword type="backupWallet" coinType={coinType} walletName={name} priv={priv} onCancel={this.closePopup} onSuccess={this.handleSuccess} />
      </div>
    );
  }
}


export default DeleteWallet1;
