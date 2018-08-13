import { connect } from 'react-redux';
import { UpdateWalletName } from 'app/components/';
import {  closePopup } from 'redux/actions/popupActions';
import { updateWalletName, resetSelectedWallet } from 'redux/actions/walletActions';

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
    updateWalletName: (s1, s2) => dispatch(updateWalletName(s1, s2)),
    resetSelectedWallet: () => dispatch(resetSelectedWallet())
  };
}

const UpdateWalletNameContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateWalletName);

export default UpdateWalletNameContainer;
