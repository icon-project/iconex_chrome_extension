import { connect } from 'react-redux';
import { BackupWallet } from 'app/components/';
import { togglePopup, initPopupState, setPopupNum } from 'redux/actions/popupActions';
import { setPrivKeyAndV3ForBackup } from 'redux/actions/walletActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    selectedAccount: state.mainPage.selectedAccount,
    privKey: state.wallet._06_privateKey,
    v3: state.wallet._06_v3,
    popupNum: state.popup.popupNum,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopup: () => dispatch(togglePopup()),
    initPopupState: () => dispatch(initPopupState()),
    setPopupNum: (i) => dispatch(setPopupNum(i)),
    setPrivKeyAndV3ForBackup: (s) => dispatch(setPrivKeyAndV3ForBackup(s)),
  };
}

const BackupWalletContainer = connect(mapStateToProps, mapDispatchToProps)(BackupWallet);

export default BackupWalletContainer;
