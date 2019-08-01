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
  ContractListContainer,
  ConnectLedgerContainer,
  ClaimIScoreContainer,
  StakeContainer,
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

  switchPopupClass = () => {
    const { popupType, popupNum } = this.props

    if (popupType.startsWith('sendTransaction')) {
      const pageType = popupType.split('_')[1];
      switch (true) {
        case (pageType === 'transaction' && (popupNum === 2 || popupNum === 3)): {
          return `ledger send num-${popupNum}`
        }
        case (pageType === 'contract' && popupNum === 2): {
          return 'contract'
        }
        case (pageType === 'contract' && popupNum === 3): {
          return 'ledger'
        }
        default:
          return ''
      }
    }

    if (popupType === 'connectLedger' && popupNum === 1) {
      return 'ledger'
    }

    if (popupType === 'claimIScore') {
      return 'claim'
    }

    if (popupType === 'stake') {
      return 'stake'
    }

    return ''
  }

  render() {
    const {
      popupState,
      popupType,
    } = this.props;

    const content = (type) => {
      switch (type) {
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
          return <AddressListContainer type={type} />
        case 'sendTransaction_exchange':
        case 'sendTransaction_transaction':
        case 'sendTransaction_contract':
        case 'sendTransaction_vote':
        case 'sendTransaction_stake':
        case 'sendTransaction_claimIScore':
          const pageType = popupType.split('_')[1];
          return <SendTransactionContainer type={type} pageType={pageType} />
        case 'changePasscode':
          return <ChangePasscodeContainer />
        case 'unlockPopup':
          return <UnlockPopupContainer />
        case 'immunityPopup':
          return <ImmunityPopupContainer />
        case 'contractList':
          return <ContractListContainer type={type} />
        case 'connectLedger':
          return <ConnectLedgerContainer />
        case 'claimIScore':
          return <ClaimIScoreContainer />
        case 'stake':
          return <StakeContainer />
        default:
          break;
      }
    }

    return (
      <div>
        {popupState && (
          <div id="popup" className={`popup-wrap ${this.switchPopupClass()}`}>
            {content(popupType)}
          </div>
        )}
      </div>
    );
  }
}

export default Popup;
