import { connect } from 'react-redux';
import { isLoggedIn, setLockState } from 'redux/actions/authActions';
import { closePopup } from 'redux/actions/popupActions';
import { getWallet } from 'redux/actions/walletActions';
import { setShowNotice, setShowPrepNotice } from 'redux/actions/globalActions';
import Routes from 'app/Routes.js';

function mapStateToProps(state) {
  return {
    initLoading: state.auth.initLoading,
    isLoggedIn: state.auth.isLoggedIn,
    passcodeHash: state.global.passcodeHash,
    isLocked: state.auth.isLocked,
    language: state.global.language,
    showNotice: state.global.showNotice,
    showPrepNotice: state.global.showPrepNotice,
    isLedger: state.ledger.isLedger
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkAuth: () => dispatch(isLoggedIn()),
    getWallet: () => dispatch(getWallet()),
    setLockState: (isLocked) => dispatch(setLockState(isLocked)),
    setShowNotice: () => dispatch(setShowNotice()),
    setShowPrepNotice: () => dispatch(setShowPrepNotice()),
    closePopup: () => dispatch(closePopup())
  };
}

const RouteContainer = connect(mapStateToProps, mapDispatchToProps)(Routes);

export default RouteContainer;
