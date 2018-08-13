import { connect } from 'react-redux';
import { UpdateToken } from 'app/components/';
import { updateToken, resetSelectedWallet } from 'redux/actions/walletActions';
import { withRouter } from 'react-router-dom';
import {  closePopup } from 'redux/actions/popupActions';

function mapStateToProps(state) {
  return {
    selectedAccount: state.wallet.selectedWallet.account,
    selectedTokenId: state.wallet.selectedWallet.tokenId,
    wallets: state.wallet.wallets,
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {

    closePopup: () => dispatch(closePopup()),
    updateToken: (account, id, data) => dispatch(updateToken(account, id, data)),
    resetSelectedWallet: () => dispatch(resetSelectedWallet())
  };
}

const UpdateTokenContainer = connect(mapStateToProps, mapDispatchToProps)(UpdateToken);

export default withRouter(UpdateTokenContainer);
