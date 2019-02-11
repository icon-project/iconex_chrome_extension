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
    this.props.history.push(ROUTE['mywallet']);
  }

  render() {
    const { I18n } = this.props;
    return (
      <div className='popup-wrap home'>
        <div className="dimmed"></div>
        <SmallPopup
          handleCancel={this.closePopup}
          handleSubmit={this.handleSubmit}
          text={I18n.deleteToken.info}
          cancelText={I18n.button.no}
          submitText={I18n.button.yes}
        />
      </div>
    );
  }
}

export default DeleteToken;
