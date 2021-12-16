import React, { Component } from 'react';
import { CheckPassword } from 'app/components/';
import { routeConstants as ROUTE, } from 'constants/index'
import { withRouter } from 'react-router-dom'

const INIT_STATE = {

}

@withRouter
class SendTransaction1 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  closePopup = () => {
    this.setState(INIT_STATE);
    this.props.resetSelectedWallet();
    this.props.closePopup();
  }

  handleSuccess = (privKey) => {
    const {
      pageType: popupType,
      openPopup,
      openVoteMode,
      openBondMode,
      history,
      setLogInState,
      closePopup,
    } = this.props

    setLogInState({
      isLoggedIn: true,
      privKey: privKey
    });
    closePopup();

    switch (popupType) {
      case 'vote':
        history.push({
          pathname: ROUTE['voting']
        });
        openVoteMode()
        break
      case 'bond':
        history.push({
          pathname: ROUTE['bonding']
        });
        openBondMode()
        break
      case 'stake':
      case 'claimIScore':
        openPopup({ popupType })
        break
      default:
        break
    }
  }

  render() {
    const {
      wallets, selectedAccount
    } = this.props;

    const name = wallets[selectedAccount].name;
    const priv = wallets[selectedAccount].priv;

    return (
      <div className="popup size-medium2 moving-down">
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
