import { connect } from 'react-redux';
import { isLoggedIn, setLockState } from 'redux/actions/authActions';
import { getWallet } from 'redux/actions/walletActions';
import { setShowNotice } from 'redux/actions/globalActions';
import { setAddressRequest, setTransaction, setScore, setSigning } from 'redux/actions/externalActions';
import Routes from 'app-popup/Routes.js';

function mapStateToProps(state) {
  return {
    initLoading: state.auth.initLoading,
    isLoggedIn: state.auth.isLoggedIn,
    passcodeHash: state.global.passcodeHash,
    isLocked: state.auth.isLocked,
    language: state.global.language,
    showNotice: state.global.showNotice,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkAuth: () => dispatch(isLoggedIn()),
    getWallet: () => dispatch(getWallet()),
    setLockState: (isLocked) => dispatch(setLockState(isLocked)),
    setShowNotice: () => dispatch(setShowNotice()),

    setAddressRequest: payload => dispatch(setAddressRequest(payload)),
    setTransaction: payload => dispatch(setTransaction(payload)),
    setScore: payload => dispatch(setScore(payload)),
    setSigning: payload => dispatch(setSigning(payload)),
  };
}

const RouteContainer = connect(mapStateToProps, mapDispatchToProps)(Routes);

export default RouteContainer;
