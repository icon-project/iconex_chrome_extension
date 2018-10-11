import { connect } from 'react-redux';
import { isLoggedIn, setLockState } from 'redux/actions/authActions';
import { getWallet } from 'redux/actions/walletActions';
import { setShowNotice } from 'redux/actions/globalActions';
import { setAddressRequest, setScore, setSigning } from 'redux/actions/externalActions';
import Routes from 'app-popup/Routes.js';
import { closePopup } from 'redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    initLoading: state.auth.initLoading,
    isLoggedIn: state.auth.isLoggedIn,
    passcodeHash: state.global.passcodeHash,
    isLocked: state.auth.isLocked,
    language: state.global.language,
    showNotice: state.global.showNotice,
    popupType: state.popup.popupType
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkAuth: () => dispatch(isLoggedIn()),
    getWallet: () => dispatch(getWallet()),
    setLockState: (isLocked) => dispatch(setLockState(isLocked)),
    setShowNotice: () => dispatch(setShowNotice()),
    closePopup: () => dispatch(closePopup()),

    setAddressRequest: payload => dispatch(setAddressRequest(payload)),
    setScore: payload => dispatch(setScore(payload)),
    setSigning: payload => dispatch(setSigning(payload)),
  };
}

const RouteContainer = connect(mapStateToProps, mapDispatchToProps)(Routes);

export default RouteContainer;
