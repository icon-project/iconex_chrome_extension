import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { UnlockPopup } from 'components/';
import { togglePopup } from 'redux/actions/popupActions';
import { setLock } from 'redux/actions/globalActions';

function mapStateToProps(state) {
  return {
    passcodeHash: state.global.passcodeHash,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopup: () => dispatch(togglePopup()),
    setLock: (passcodeHash, emailAddress) => dispatch(setLock(passcodeHash, emailAddress))
  };
}

const UnlockPopupContainer = connect(mapStateToProps, mapDispatchToProps)(UnlockPopup);

export default withRouter(UnlockPopupContainer);
