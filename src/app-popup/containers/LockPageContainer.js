import { connect } from 'react-redux';
import LockPage from 'app-popup/components/LockPage';
import { openPopup } from 'redux/actions/popupActions';
import { setUnlock } from 'redux/actions/authActions';
import { setShowChangePasscodePopup } from 'redux/actions/globalActions';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    passcodeHash: state.global.passcodeHash,
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openPopup: (s) => dispatch(openPopup(s)),
    setUnlock: () => dispatch(setUnlock()),
    setShowChangePasscodePopup: (isTrue) => dispatch(setShowChangePasscodePopup(isTrue))
  };
}

const LockPageContainer = connect(mapStateToProps, mapDispatchToProps)(LockPage);

export default withRouter(LockPageContainer);
