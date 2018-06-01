import { connect } from 'react-redux';
import { isLoggedIn, checkIsLocked } from 'redux/actions/authActions';
import { getWallet } from 'redux/actions/walletActions';
import { setShowNotice, setIsAppOpenedByPopup, setIsRequestedStatus, setTransactionStatus } from 'redux/actions/globalActions';
import Routes from 'app-popup/Routes.js';

function mapStateToProps(state) {
  return {
    initLoading: state.auth.initLoading,
    isLoggedIn: state.auth.isLoggedIn,
    passcodeHash: state.global.passcodeHash,
    isLocked: state.auth.isLocked,
    language: state.global.language,
    showNotice: state.global.showNotice,
    // isRequestedStatus: state.global.message.isRequestedStatus,
    // transaction: state.global.message.transaction,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkAuth: () => dispatch(isLoggedIn()),
    getWallet: () => dispatch(getWallet()),
    checkIsLocked: (checkIsLock) => dispatch(checkIsLocked(checkIsLock)),
    setShowNotice: () => dispatch(setShowNotice()),
    setIsAppOpenedByPopup: (isTrue) => dispatch(setIsAppOpenedByPopup(isTrue)),
    setIsRequestedStatus: (requested) => dispatch(setIsRequestedStatus(requested)),
    setTransactionStatus: (transaction) => dispatch(setTransactionStatus(transaction)),
  };
}

const RouteContainer = connect(mapStateToProps, mapDispatchToProps)(Routes);

export default RouteContainer;
