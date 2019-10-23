import React, { Component } from 'react';
import { SmallPopup } from 'app/components/';

import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class DeleteWallet1 extends Component {

  closePopup = () => {
    this.props.closePopup();
    this.props.resetSelectedWallet();
  }

  handleSubmit = () => {
    if (this.props.hasBalance) {
      this.props.setPopupNum(2);
    } else {
      this.props.closePopup();
      this.props.deleteWallet(this.props.selectedAccount);
    }
  }

  render() {
    const { I18n } = this.props;
    const text = !this.props.hasBalance ? I18n.deleteWallet.info1 : I18n.deleteWallet.info2
    return (
      <div className='popup-wrap ledger'>
        <SmallPopup
          handleCancel={this.closePopup}
          handleSubmit={this.handleSubmit}
          text={text}
          cancelText={I18n.button.no}
          submitText={I18n.button.yes}
          isFullButton={true}
        />
      </div>
    );
  }
}

export default DeleteWallet1;
