import React, { Component } from 'react';
import { CheckPassword } from 'app/components/';
import Wallet from 'ethereumjs-wallet';
import { Alert } from 'app/components/';
import { walletNameSelector, walletPrivSelector } from 'redux/helper/walletSelector';

const INIT_STATE = {
  showAlertAddressSame: false,
  sameWalletName: ''
}

class SwapToken1 extends Component {

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
    new Promise(resolve => {
      const wallet = Wallet.fromPrivateKey(Buffer(privKey, 'hex'));
      resolve(wallet);
    }).then(result => {

      const { wallets } = this.props;
      const swapWalletAddress = result.getAddressIcx().toString('hex')
      const isSwapWalletExist = () => wallets[swapWalletAddress]

      if (isSwapWalletExist()) {
        this.props.setIcxSwapAddress(swapWalletAddress)
        this.props.setPrivKeyForSwap(privKey);
        this.props.setEXTRLogInState({isLoggedIn: true, privKey: privKey});
        this.props.checkSwapWalletExist(true);
        this.props.setPopupNum(2);
        return;
      }

      this.props.setPrivKeyForSwap(privKey);
      this.props.setEXTRLogInState({isLoggedIn: true, privKey: privKey});
      this.setState({
        wallet: result,
      }, () => {
        this.props.setWalletObject(result);
        this.props.setAddress(swapWalletAddress);
        this.props.setCoinType('icx')
        this.props.setPopupNum(2);
      })
    })
  }

  render() {
    const { showAlertAddressSame, sameWalletName } = this.state
    const { I18n } = this.props;

    const name = walletNameSelector()
    const priv = walletPrivSelector()

    return (
      <div className="popup size-medium2">
        <CheckPassword type="sendTransaction" walletName={name} priv={priv} onCancel={this.closePopup} onSuccess={this.handleSuccess} />
        {
          showAlertAddressSame && (
            <Alert
              handleSubmit={this.closePopup}
              text={`${I18n.swapToken.alertSameWallet1} ${sameWalletName}${I18n.swapToken.alertSameWallet2}`}
              submitText={I18n.button.confirm}
            />
          )
        }
      </div>
    );
  }
}


export default SwapToken1;
