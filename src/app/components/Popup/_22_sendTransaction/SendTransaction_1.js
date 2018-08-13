import React, { Component } from 'react';
import { CheckPassword } from 'app/components/';

const INIT_STATE = {

}

class SendTransaction1 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  closePopup = () => {
    this.setState(INIT_STATE);
    this.props.setEXTRLogInState({
      isLoggedIn: false
    });
    this.props.resetSelectedWallet();
    this.props.closePopup();
  }

  handleSuccess = (privKey) => {
    this.props.setEXTRLogInState({
      isLoggedIn: true,
      privKey: privKey
    });
    this.props.closePopup();
  }

  render() {
    const {
      wallets, selectedAccount
    } = this.props;

    const name = wallets[selectedAccount].name;
    const priv = wallets[selectedAccount].priv;

    return (
      <div className="popup size-medium2">
        <CheckPassword
          type="sendTransaction"
          walletName={name}
          priv={priv}
          onCancel={this.closePopup}
          onSuccess={this.handleSuccess}
        />
      </div>
    );
  }
}


export default SendTransaction1;
