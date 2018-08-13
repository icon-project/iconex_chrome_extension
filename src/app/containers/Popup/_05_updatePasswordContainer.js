import { connect } from 'react-redux';
import { UpdatePassword } from 'app/components/';
import {  closePopup } from 'redux/actions/popupActions';
import { updatePassword, resetSelectedWallet } from 'redux/actions/walletActions';
import { logIn } from 'redux/actions/authActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    selectedAccount: state.wallet.selectedWallet.account,
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {

    closePopup: () => dispatch(closePopup()),
    updatePassword: (s1, s2) => dispatch(updatePassword(s1, s2)),
    resetSelectedWallet: () => dispatch(resetSelectedWallet()),
    logIn: () => dispatch(logIn())
  };
}

const UpdatePasswordContainer = connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);

export default UpdatePasswordContainer;
