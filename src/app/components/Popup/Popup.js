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
  SendTransactionContainer,
  UnlockPopupContainer,
  ChangePasscodeContainer,
  ImmunityPopupContainer,
  SwapTokenContainer,
  ContractListContainer,
  ConnectLedgerContainer
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
    this.props.closePopup();
  }

  switchPopupClass = () => {
    const { popupType, popupNum, funcResult, error } = this.props
    const isSuccess = funcResult[0] && !error
    if (popupType.startsWith('sendTransaction')) {
      const pageType = popupType.split('_')[1];
      switch(true) {
        case ((pageType === 'swap' || pageType === 'transaction') && popupNum === 2) : {
          return 'send'
        }
        case (pageType === 'contract' && popupNum === 3 && !isSuccess) : {
          return ''
        }
        case (pageType === 'contract' && (popupNum === 2 || popupNum === 3)) : {
          return 'contract'
        }
        default:
          return ''
      }
    }
    if (popupType === 'connectLedger' && popupNum === 1) {
      return 'ledger'
    }
    return ''
  }

  render() {
    const {
      popupState,
      popupType,
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
        case 'deleteWallet_hasBalance':
          return <DeleteWalletContainer hasBalance={true} />
        case 'deleteWallet':
          return <DeleteWalletContainer hasBalance={false} />
        case 'exportWallet':
          return <ExportWalletContainer />
        case 'deleteToken':
          return <DeleteTokenContainer />
        case 'updateToken':
          return <UpdateTokenContainer />
        case 'addressBook':
        case 'myWallet':
          return <AddressListContainer type={type}/>
        case 'sendTransaction_exchange':
        case 'sendTransaction_transaction':
          return <SendTransactionContainer type={type} pageType={'transaction'}/>
        case 'sendTransaction_swap':
          return <SendTransactionContainer type={type} pageType={'swap'}/>
        case 'sendTransaction_contract':
          return <SendTransactionContainer type={type} pageType={'contract'}/>
        case 'changePasscode':
          return <ChangePasscodeContainer />
        case 'unlockPopup':
          return <UnlockPopupContainer />
        case 'immunityPopup':
          return <ImmunityPopupContainer />
        case 'swapToken':
          return <SwapTokenContainer />
        case 'contractList':
          return <ContractListContainer type={type}/>
        case 'connectLedger':
          return <ConnectLedgerContainer />
        default:
          break;
          }
    }

    return (
      <div>
        { popupState && (
          <div id="popup" className={`popup-wrap ${this.switchPopupClass()}`}>
            { content(popupType) }
        	</div>
        )}
      </div>
    );
  }
}

export default Popup;
