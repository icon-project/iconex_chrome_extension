import React, { Component } from 'react';
import { SmallPopup } from 'app/components/'
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {

}

@withLanguageProps
class ExportWallet1 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  closePopup = () => {
    this.setState(INIT_STATE);
    this.props.closePopup();
  }

  handleSubmit = () => {
    this.props.setPopupNum(2);
  }

  render() {
    const { I18n } = this.props;
    return (
      <div className='popup-wrap ledger'>
        <SmallPopup
          handleCancel={this.closePopup}
          handleSubmit={this.handleSubmit}
          text={I18n.exportWallet.caution}
          cancelText={I18n.button.cancel}
          submitText={I18n.button.confirm}
          isFullButton={true}
        />
      </div>
    );
  }
}

export default ExportWallet1;
