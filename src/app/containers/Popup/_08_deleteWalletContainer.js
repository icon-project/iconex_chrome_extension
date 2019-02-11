import { connect } from 'react-redux';
import { DeleteWallet } from 'app/components/';
import { deleteWallet } from 'redux/actions/signupActions';
import { getWallet, resetSelectedWallet } from 'redux/actions/walletActions';
import { setPopupNum, closePopup } from 'redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    popupNum: state.popup.popupNum,
    selectedAccount: state.wallet.selectedWallet.account,
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPopupNum: (num) => dispatch(setPopupNum(num)),
    closePopup: () => dispatch(closePopup()),
    getWallet: () => dispatch(getWallet()),
    deleteWallet: (s) => dispatch(deleteWallet(s)),
    resetSelectedWallet: () => dispatch(resetSelectedWallet())
  };
}

const DeleteWalletContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteWallet);

export default DeleteWalletContainer;
