import React, { Component } from 'react';
import { SmallPopup } from 'app/components/';
import { walletSelector } from 'redux/helper/walletSelector'
import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class DeleteWallet extends Component {

  closePopup = () => {
    this.props.closePopup();
    this.props.resetSelectedWallet();
  }

  handleSubmit = () => {
    this.props.closePopup();
    this.props.deleteWallet(this.props.selectedAccount);
  }

  render() {
    const wallet = walletSelector()
    const balance = wallet ? wallet.balance : 0
    const { I18n } = this.props;
    const text = balance.eq(0) ? I18n.deleteWallet.info1 : I18n.deleteWallet.info2
    return (
      <div className='popup-wrap home'>
        <div className="dimmed"></div>
        <SmallPopup
          handleCancel={this.closePopup}
          handleSubmit={this.handleSubmit}
          text={text}
          cancelText={I18n.button.cancel}
          submitText={I18n.button.confirm}
        />
      </div>
    );
  }
}

export default DeleteWallet;
