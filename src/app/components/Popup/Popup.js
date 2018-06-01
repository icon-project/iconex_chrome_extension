import React, { Component } from 'react';

import {
  CreateWalletContainer,
  ImportWalletContainer,
  AddWalletContainer,
  UpdateWalletNameContainer,
  UpdatePasswordContainer,
  BackupWalletContainer,
  AddTokenContainer,
  DeleteWalletContainer,
  ExportWalletContainer,
  DeleteTokenContainer,
  UpdateTokenContainer,
  AddressListContainer,
  SendEmailContainer,
  SendTransactionContainer,
  UnlockPopupContainer,
  ChangePasscodeContainer,
  ImmunityPopupContainer,
  SwapTokenContainer
} from 'app/containers/';

class Popup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: null
    }
  }

  componentDidUpdate() {
    const {
      popupState,
    } = this.props;
    if (popupState) {
  		window.jQuery("#popup").popUpFx();
    }
  }


  closePopup = () => {
    this.props.initPopupState();
  }

  render() {
    const {
      popupState,
      popupType,
      popupNum
    } = this.props;

    const content = (type) => {
      switch(type) {
        case 'createWallet':
          return <CreateWalletContainer />
        case 'importWallet':
          return <ImportWalletContainer />
        case 'addWallet':
          return <AddWalletContainer />
        case 'updateWalletName':
          return <UpdateWalletNameContainer />
        case 'updatePassword':
          return <UpdatePasswordContainer />
        case 'backupWallet':
          return <BackupWalletContainer />
        case 'addToken':
          return <AddTokenContainer />
        case 'deleteWallet':
          return <DeleteWalletContainer />
        case 'exportWallet':
          return <ExportWalletContainer />
        case 'deleteToken':
          return <DeleteTokenContainer />
        case 'updateToken':
          return <UpdateTokenContainer />
        case 'address_exchange':
        case 'history_exchange':
        case 'address_transaction':
        case 'history_transaction':
          return <AddressListContainer type={type}/>
        case 'sendTransaction_exchange':
        case 'sendTransaction_transaction':
          return <SendTransactionContainer type={type}/>
        case 'sendTransaction_swap':
          return <SendTransactionContainer type={type} swapPage={true}/>
        case 'sendEmail':
          return <SendEmailContainer />
        case 'changePasscode':
          return <ChangePasscodeContainer />
        case 'unlockPopup':
          return <UnlockPopupContainer />
        case 'immunityPopup':
          return <ImmunityPopupContainer />
        case 'swapToken':
          return <SwapTokenContainer />
        default:
          break;
          }
    }

    return (
      <div>
        { popupState && (
          <div id="popup" className={`popup-wrap ${popupType.startsWith('sendTransaction') && popupNum === 2 ? 'send' : ''}`}>
            { content(popupType) }
        	</div>
        )}
      </div>
    );
  }
}

export default Popup;
