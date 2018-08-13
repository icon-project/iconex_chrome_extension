import { connect } from 'react-redux';
import { BackupWallet } from 'app/components/';
import {  closePopup, setPopupNum } from 'redux/actions/popupActions';
import { setPrivKeyAndV3ForBackup, resetSelectedWallet } from 'redux/actions/walletActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    selectedAccount: state.wallet.selectedWallet.account,
    privKey: state.wallet._06_privateKey,
    v3: state.wallet._06_v3,
    popupNum: state.popup.popupNum,

  };
}

function mapDispatchToProps(dispatch) {
  return {

    closePopup: () => dispatch(closePopup()),
    setPopupNum: (i) => dispatch(setPopupNum(i)),
    setPrivKeyAndV3ForBackup: (s) => dispatch(setPrivKeyAndV3ForBackup(s)),
    resetSelectedWallet: () => dispatch(resetSelectedWallet())
  };
}

const BackupWalletContainer = connect(mapStateToProps, mapDispatchToProps)(BackupWallet);

export default BackupWalletContainer;
