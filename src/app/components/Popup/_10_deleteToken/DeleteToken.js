import React, { Component } from 'react';
import { SmallPopup } from 'app/components/';
import { routeConstants as ROUTE } from 'constants/index';

import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class DeleteToken extends Component {

  closePopup = () => {
    this.props.closePopup();
    this.props.resetSelectedWallet();
  }

  handleSubmit = () => {
    this.props.deleteToken(this.props.selectedAccount, this.props.selectedTokenId);
    this.props.history.push(ROUTE['home']);
  }

  render() {
    const { I18n } = this.props;
    return (
      <div className='popup-wrap ledger'>
        <div className="dimmed fade-in"></div>
        <SmallPopup
          handleCancel={this.closePopup}
          handleSubmit={this.handleSubmit}
          text={I18n.deleteToken.info}
          cancelText={I18n.button.no}
          submitText={I18n.button.yes}
          isFullButton={true}
        />
      </div>
    );
  }
}

export default DeleteToken;
