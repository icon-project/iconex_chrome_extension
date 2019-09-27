import { connect } from 'react-redux';
import { Lock } from 'app/components/';
import { getWallet } from 'redux/actions/walletActions';
import { openPopup, closePopup } from 'redux/actions/popupActions';
import { setLockState } from 'redux/actions/authActions'
import { setShowChangePasscodePopup } from 'redux/actions/globalActions';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    passcodeHash: state.global.passcodeHash,
    language: state.global.language,
    showChangePasscode: state.global.message !== undefined ? state.global.message.showChangePasscodePopup : false,
    popupType: state.popup.popupType
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openPopup: (s) => dispatch(openPopup(s)),
    closePopup: () => dispatch(closePopup()),
    getWallet: () => dispatch(getWallet()),
    setLockState: (isLocked) => dispatch(setLockState(isLocked)),
    setShowChangePasscodePopup: (isTrue) => dispatch(setShowChangePasscodePopup(isTrue))
  };
}

const LockContainer = connect(mapStateToProps, mapDispatchToProps)(Lock);

export default withRouter(LockContainer);
