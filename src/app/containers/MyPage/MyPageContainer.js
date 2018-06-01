import { connect } from 'react-redux';
import { MyPage } from 'app/components/';
import { setLock } from 'redux/actions/globalActions';
import { togglePopup, setPopupType, setPopupNum } from 'redux/actions/popupActions';
import {
  setExportWalletObject
} from 'redux/actions/walletActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    exportWalletObjects: state.wallet._09_exportWalletObjects,
    passcodeHash: state.global.passcodeHash,
    emailAddress: state.global.email,
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLock: (passcodeHash, email) => dispatch(setLock(passcodeHash, email)),
    setExportWalletObject: (o) => dispatch(setExportWalletObject(o)),
    togglePopup: () => dispatch(togglePopup()),
    setPopupType: (type) => dispatch(setPopupType(type)),
    setPopupNum: (n) => dispatch(setPopupNum(n)),
  };
}

const MyPageContainer = connect(mapStateToProps, mapDispatchToProps)(MyPage);

export default MyPageContainer;
