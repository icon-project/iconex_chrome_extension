import { connect } from 'react-redux';
import { UpdatePassword } from 'components/';
import { togglePopup, initPopupState } from 'redux/actions/popupActions';
import { updatePassword } from 'redux/actions/walletActions';
import { logIn } from 'redux/actions/authActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    selectedAccount: state.mainPage.selectedAccount,
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopup: () => dispatch(togglePopup()),
    initPopupState: () => dispatch(initPopupState()),
    updatePassword: (s1, s2) => dispatch(updatePassword(s1, s2)),
    logIn: () => dispatch(logIn())
  };
}

const UpdatePasswordContainer = connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);

export default UpdatePasswordContainer;
