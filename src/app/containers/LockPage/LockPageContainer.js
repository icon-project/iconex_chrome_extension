import { connect } from 'react-redux';
import { LockPage } from 'app/components/';
import { togglePopup, setPopupType } from 'redux/actions/popupActions';
import { setUnlock } from 'redux/actions/authActions';
import { setShowChangePasscodePopup } from 'redux/actions/globalActions';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    passcodeHash: state.global.passcodeHash,
    email: state.global.email,
    language: state.global.language,
    showChangePasscode: state.global.message !== undefined ? state.global.message.showChangePasscodePopup : false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopup: () => dispatch(togglePopup()),
    setPopupType: (s) => dispatch(setPopupType(s)),
    setUnlock: () => dispatch(setUnlock()),
    setShowChangePasscodePopup: (isTrue) => dispatch(setShowChangePasscodePopup(isTrue))
  };
}

const LockPageContainer = connect(mapStateToProps, mapDispatchToProps)(LockPage);

export default withRouter(LockPageContainer);
