import { connect } from 'react-redux';
import { isLoggedIn, setLockState } from 'redux/actions/authActions';
import { getWallet } from 'redux/actions/walletActions';
import { setShowNotice, setIsRequestedStatus, setTransactionStatus, setScoreData, setSigningData } from 'redux/actions/globalActions';
import Routes from 'app-popup/Routes.js';

function mapStateToProps(state) {
  return {
    initLoading: state.auth.initLoading,
    isLoggedIn: state.auth.isLoggedIn,
    passcodeHash: state.global.passcodeHash,
    isLocked: state.auth.isLocked,
    language: state.global.language,
    showNotice: state.global.showNotice,
    isRequestedStatus: state.global.message ? state.global.message.isRequestedStatus : undefined,
    transaction: state.global.message ? state.global.message.transaction : undefined,
    score: state.global.message && state.global.message.score ? state.global.message.score : {},
    signing: state.global.message && state.global.message.signing ? state.global.message.signing : {},
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkAuth: () => dispatch(isLoggedIn()),
    getWallet: () => dispatch(getWallet()),
    setLockState: (isLocked) => dispatch(setLockState(isLocked)),
    setShowNotice: () => dispatch(setShowNotice()),
    setIsRequestedStatus: (requested) => dispatch(setIsRequestedStatus(requested)),
    setTransactionStatus: (transaction) => dispatch(setTransactionStatus(transaction)),
    setScoreData: score => dispatch(setScoreData(score)),
    setSigningData: hash => dispatch(setSigningData(hash)),
  };
}

const RouteContainer = connect(mapStateToProps, mapDispatchToProps)(Routes);

export default RouteContainer;
