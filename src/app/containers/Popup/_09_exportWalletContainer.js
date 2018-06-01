import { connect } from 'react-redux';
import { ExportWallet } from 'app/components/';
import { togglePopup, setPopupType, setPopupNum, initPopupState } from 'redux/actions/popupActions';
import {
  setExportWalletObject,
  setNewPw,
  resetExportWalletState
} from 'redux/actions/walletActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    exportWalletObjects: state.wallet._09_exportWalletObjects,
    newPw: state.wallet._09_newPw,
    popupNum: state.popup.popupNum,
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setExportWalletObject: (o) => dispatch(setExportWalletObject(o)),
    setNewPw: (s) => dispatch(setNewPw(s)),
    resetExportWalletState: () => dispatch(resetExportWalletState()),
    togglePopup: () => dispatch(togglePopup()),
    initPopupState: () => dispatch(initPopupState()),
    setPopupType: (s) => dispatch(setPopupType(s)),
    setPopupNum: (n) => dispatch(setPopupNum(n)),
  };
}

const ExportWalletContainer = connect(mapStateToProps, mapDispatchToProps)(ExportWallet);

export default ExportWalletContainer;
