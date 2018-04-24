import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ChangePasscode } from 'components/';
import { togglePopup } from 'redux/actions/popupActions';
import { setLock } from 'redux/actions/globalActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    emailAddress: state.global.email,
    language: state.global.language    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopup: () => dispatch(togglePopup()),
    setLock: (passcodeHash, email) => dispatch(setLock(passcodeHash, email))
  };
}

const ChangePasscodeContainer = connect(mapStateToProps, mapDispatchToProps)(ChangePasscode);

export default withRouter(ChangePasscodeContainer);
