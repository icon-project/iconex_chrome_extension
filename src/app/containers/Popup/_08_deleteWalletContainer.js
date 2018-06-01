import { connect } from 'react-redux';
import { DeleteWallet } from 'app/components/';
import { deleteWallet } from 'redux/actions/signupActions';
import { getWallet } from 'redux/actions/walletActions';
import { togglePopup, initPopupState } from 'redux/actions/popupActions';

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
    getWallet: () => dispatch(getWallet()),
    deleteWallet: (s) => dispatch(deleteWallet(s))
  };
}

const DeleteWalletContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteWallet);

export default DeleteWalletContainer;
