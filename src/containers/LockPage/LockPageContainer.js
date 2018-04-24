import { connect } from 'react-redux';
import { LockPage } from 'components/';
import { togglePopup, setPopupType } from 'redux/actions/popupActions';
import { setUnlock } from 'redux/actions/authActions';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    passcodeHash: state.global.passcodeHash,
    email: state.global.email,
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopup: () => dispatch(togglePopup()),
    setPopupType: (s) => dispatch(setPopupType(s)),
    setUnlock: () => dispatch(setUnlock()),
  };
}

const LockPageContainer = connect(mapStateToProps, mapDispatchToProps)(LockPage);

export default withRouter(LockPageContainer);
