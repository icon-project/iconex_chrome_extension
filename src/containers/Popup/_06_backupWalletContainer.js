import { connect } from 'react-redux';
import { BackupWallet } from 'components/';
import { togglePopup, initPopupState, setPopupNum } from 'redux/actions/popupActions';
import { setPrivKeyForBackup } from 'redux/actions/walletActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    selectedAccount: state.mainPage.selectedAccount,
    privKey: state.wallet._06_privateKey,
    popupNum: state.popup.popupNum,
    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopup: () => dispatch(togglePopup()),
    initPopupState: () => dispatch(initPopupState()),
    setPopupNum: (i) => dispatch(setPopupNum(i)),
    setPrivKeyForBackup: (s) => dispatch(setPrivKeyForBackup(s)),
  };
}

const BackupWalletContainer = connect(mapStateToProps, mapDispatchToProps)(BackupWallet);

export default BackupWalletContainer;
