import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { UnlockPopup } from 'app/components/';
import { closePopup } from 'redux/actions/popupActions';
import { setLock } from 'redux/actions/globalActions';


function mapStateToProps(state) {
  return {
    passcodeHash: state.global.passcodeHash,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closePopup: () => dispatch(closePopup()),
    setLock: (passcodeHash) => dispatch(setLock(passcodeHash))
  };
}

const UnlockPopupContainer = connect(mapStateToProps, mapDispatchToProps)(UnlockPopup);

export default withRouter(UnlockPopupContainer);
