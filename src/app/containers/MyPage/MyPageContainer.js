import { connect } from 'react-redux';
import { MyPage } from 'app/components/';
import { setLock } from 'redux/actions/globalActions';
import { openPopup, setPopupNum } from 'redux/actions/popupActions';
import {
  setExportWalletObject
} from 'redux/actions/walletActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    exportWalletObjects: state.wallet._09_exportWalletObjects,
    passcodeHash: state.global.passcodeHash,
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLock: (passcodeHash) => dispatch(setLock(passcodeHash)),
    setExportWalletObject: (o) => dispatch(setExportWalletObject(o)),

    openPopup: (type) => dispatch(openPopup(type)),
    setPopupNum: (n) => dispatch(setPopupNum(n)),
  };
}

const MyPageContainer = connect(mapStateToProps, mapDispatchToProps)(MyPage);

export default MyPageContainer;
