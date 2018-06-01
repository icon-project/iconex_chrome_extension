import { connect } from 'react-redux';
import { UpdateWalletName } from 'app/components/';
import { togglePopup, initPopupState } from 'redux/actions/popupActions';
import { updateWalletName } from 'redux/actions/walletActions';

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
    updateWalletName: (s1, s2) => dispatch(updateWalletName(s1, s2))
  };
}

const UpdateWalletNameContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateWalletName);

export default UpdateWalletNameContainer;
